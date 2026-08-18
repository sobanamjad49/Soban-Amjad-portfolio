import { test, expect, type Page } from "@playwright/test";
import { site } from "../../src/data/site";

/** Fails the test if the page logs an error or throws. */
function trackConsole(page: Page) {
  const problems: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console.error: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  return problems;
}

test.describe("page shell", () => {
  test("loads with no console errors and correct metadata", async ({ page }) => {
    const problems = trackConsole(page);
    await page.goto("/");

    await expect(page).toHaveTitle(
      "Soban Amjad — Software Engineer & Full-Stack Developer",
    );
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);

    // Exactly one h1, and it names the person.
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Soban Amjad");

    await page.waitForTimeout(1500);
    expect(problems).toEqual([]);
  });

  test("every in-page section anchor exists", async ({ page }) => {
    await page.goto("/");
    const ids = [
      "home",
      "about",
      "skills",
      "experience",
      "projects",
      "services",
      "contact",
    ];
    for (const id of ids) {
      await expect(page.locator(`#${id}`), `missing #${id}`).toHaveCount(1);
    }
  });

  test("headline words are separated (no run-together text)", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("h1").innerText();
    expect(text).toContain("Soban Amjad");
    expect(text).not.toMatch(/SobanAmjad|SoftwareEngineer|Full-StackDeveloper/);
  });
});

test.describe("navigation", () => {
  test("desktop nav links scroll to their sections", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop-only nav");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    for (const id of ["about", "skills", "experience", "projects", "contact"]) {
      await page.locator(`header nav a[href="#${id}"]`).click();
      // Wait for the smooth scroll to settle rather than guessing a duration.
      const settleMs = await page.evaluate(
        () =>
          new Promise<number>((resolve) => {
            const t0 = performance.now();
            let last = window.scrollY;
            let still = 0;
            const tick = () => {
              if (window.scrollY === last) still += 1;
              else still = 0;
              last = window.scrollY;
              if (still > 4 || performance.now() - t0 > 6000) resolve(Math.round(performance.now() - t0));
              else requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }),
      );
      expect(settleMs, `scrolling to #${id} took too long`).toBeLessThan(2500);
      const inView = await page.evaluate((target) => {
        const el = document.getElementById(target)!;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight * 0.5 && r.bottom > 0;
      }, id);
      expect(inView, `#${id} did not come into view`).toBe(true);
    }
  });

  test("mobile menu opens, navigates and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Open menu" });
    await expect(trigger).toBeVisible();
    await trigger.click();

    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();

    await menu.getByRole("link", { name: "Projects" }).click();
    await expect(menu).toBeHidden();
  });

  test("Escape closes the mobile menu and restores focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });
});

test.describe("theme", () => {
  test("toggles, persists across reloads and repaints quickly", async ({ page }, testInfo) => {
    await page.goto("/");
    const html = page.locator("html");

    const startedDark = ((await html.getAttribute("class")) ?? "").includes("dark");
    const toggle = page.getByRole("button", { name: /toggle dark and light theme/i });

    const elapsed = await page.evaluate(async () => {
      const btn = document.querySelector<HTMLButtonElement>(
        'button[aria-label="Toggle dark and light theme"]',
      )!;
      const t0 = performance.now();
      btn.click();
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      return performance.now() - t0;
    });
    // History: a circular View Transition wipe cost 1.1-2.5s; a plain class
    // flip still cost 2.5-6s because ~40 components animated their
    // `transition-colors` at once and every repaint re-rasterised the SVG
    // noise overlay. With `theme-instant`, a raster noise tile and
    // `content-visibility` on off-screen sections it lands at 46-115ms on
    // desktop. The mobile budget is looser because device emulation renders at
    // 2.6x DPR, so the repaint covers ~7x the pixels.
    const budget = testInfo.project.name === "mobile" ? 900 : 450;
    expect(elapsed, "theme toggle blocked the main thread too long").toBeLessThan(budget);

    const expectAfter = startedDark ? /^(?!.*\bdark\b)/ : /\bdark\b/;
    const expectBack = startedDark ? /\bdark\b/ : /^(?!.*\bdark\b)/;

    await expect(html).toHaveClass(expectAfter);
    await page.reload();
    await expect(html).toHaveClass(expectAfter);

    await toggle.click();
    await expect(html).toHaveClass(expectBack);
  });
});

test.describe("links and contact", () => {
  test("resume is downloadable and actually served", async ({ page, request }) => {
    await page.goto("/");
    expect(await page.locator(`a[href="${site.resume}"]`).count()).toBeGreaterThan(0);

    const res = await request.get(site.resume);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");
    expect((await res.body()).byteLength).toBeGreaterThan(10_000);
  });

  test("social and contact links use the resume's real destinations", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator(`a[href="${site.github}"]`).count()).toBeGreaterThan(0);
    expect(await page.locator(`a[href="${site.linkedin}"]`).count()).toBeGreaterThan(0);
    expect(await page.locator(`a[href="mailto:${site.email}"]`).count()).toBeGreaterThan(0);
  });

  test("no link points at a placeholder or fabricated destination", async ({ page }) => {
    await page.goto("/");
    const bad = await page.evaluate(() =>
      [...document.querySelectorAll("a")]
        .map((a) => a.getAttribute("href") ?? "")
        .filter((h) => h === "" || h === "#" || /example\.com|your-|lorem|TODO/i.test(h)),
    );
    expect(bad).toEqual([]);
  });

  test("external links are safely targeted", async ({ page }) => {
    await page.goto("/");
    const unsafe = await page.evaluate(() =>
      [...document.querySelectorAll('a[target="_blank"]')]
        .filter((a) => !(a.getAttribute("rel") ?? "").includes("noopener"))
        .map((a) => a.getAttribute("href")),
    );
    expect(unsafe).toEqual([]);
  });

  test("copy-email button reports success", async ({ page, context }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "clipboard permissions are desktop-only");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Copy email address" }).click();
    await expect(page.getByRole("button", { name: "Email address copied" })).toBeVisible();
  });
});

test.describe("content integrity", () => {
  test("shows the resume's projects and marks private source honestly", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Keyhole", exact: true })).toBeVisible();
    await expect(page.getByText("Cybrology", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Talkspresso", { exact: true }).first()).toBeVisible();
    // Projects with no public repo must say so rather than link somewhere fake.
    await expect(page.getByText(/Source code is private/i).first()).toBeVisible();
  });

  test("does not contain content absent from the resume", async ({ page }) => {
    await page.goto("/");
    const body = (await page.locator("body").innerText()).toLowerCase();
    for (const term of ["proptoc", "snagprotect", "stripe", "drizzle", "material ui"]) {
      expect(body, `"${term}" is not in the resume`).not.toContain(term);
    }
  });
});

test.describe("accessibility", () => {
  test("skip link is reachable and focuses main content", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "keyboard-only");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page.locator("#main")).toBeVisible();
  });

  test("every control has an accessible name", async ({ page }) => {
    await page.goto("/");
    const unnamed = await page.evaluate(() =>
      [...document.querySelectorAll("button, a")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return false;
          return (el.getAttribute("aria-label") || el.textContent || "").trim().length === 0;
        })
        .map((el) => el.outerHTML.slice(0, 80)),
    );
    expect(unnamed).toEqual([]);
  });

  test("respects prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Soban Amjad");
  });
});

test.describe("command palette", () => {
  test("opens on Ctrl+K, filters, navigates and closes", async ({ page }) => {
    // Code-split mount, a smooth scroll and two open/close cycles in one test.
    test.slow();
    await page.goto("/");

    const dialog = page.getByRole("dialog", { name: "Command palette" });
    await expect(dialog).toBeHidden();

    await page.keyboard.press("Control+k");
    // The palette is code-split and mounts on the first idle period, so the
    // very first open may have to wait on its chunk. Every later open is
    // immediate.
    await expect(dialog).toBeVisible({ timeout: 15_000 });

    // The search field takes focus so the visitor can type immediately.
    await expect(page.getByRole("textbox", { name: /search sections/i })).toBeFocused();

    await page.keyboard.type("skills");
    const matches = dialog.locator("li button");
    await expect(matches).toHaveCount(1);
    await expect(matches.first()).toContainText("Go to Skills");

    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);

    await page.keyboard.press("Control+k");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("offers every nav destination plus the resume and contact actions", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");

    const dialog = page.getByRole("dialog", { name: "Command palette" });
    await expect(dialog).toBeVisible({ timeout: 15_000 });
    const labels = await dialog.locator("li button").allInnerTexts();
    const flat = labels.join(" | ");

    for (const expected of ["Go to Home", "Go to About", "Download Resume", "Email Soban"]) {
      expect(flat).toContain(expected);
    }
  });
});

test.describe("layout integrity", () => {
  /**
   * Regression guard. The hero's code panel renders unbreakable `white-space:
   * pre` lines inside a nested grid; with the default `min-width: auto` its
   * min-content escaped the scroll container and laid the whole hero out 430px
   * wide inside a 390px viewport, clipping every CTA.
   */
  test("no hero element is laid out wider than the viewport", async ({ page }) => {
    for (const width of [320, 375, 390, 430]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");

      const overflowing = await page.evaluate(() => {
        const hero = document.getElementById("home")!;
        const limit = document.documentElement.clientWidth + 1;

        /** True if something between `el` and the hero clips horizontally. */
        const isClipped = (el: Element) => {
          for (let n = el.parentElement; n && n !== hero; n = n.parentElement) {
            if (getComputedStyle(n).overflowX !== "visible") return true;
          }
          return false;
        };

        return [...hero.querySelectorAll("*")]
          .filter((el) => {
            // Decorative layers are deliberately oversized and clipped.
            if (el.getAttribute("aria-hidden") === "true") return false;
            if (el.closest("[aria-hidden='true']")) return false;
            // Marquee rails and the code block scroll or clip by design.
            if (isClipped(el)) return false;
            return el.getBoundingClientRect().right > limit;
          })
          .map((el) => `${el.tagName}.${String(el.className).slice(0, 50)}`);
      });

      expect(overflowing, `elements overflow at ${width}px`).toEqual([]);
    }
  });

  /**
   * The reveal engine hides content until an observer marks it in view. A fast
   * scroll can outrun the observer, so a settle sweep backstops it — without
   * that, sections stay permanently blank.
   */
  test("every reveal resolves even when the page is scrolled fast", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          let y = 0;
          let n = 0;
          const step = () => {
            y += 400;
            window.scrollTo(0, y);
            n += 1;
            if (n < 60 && y < document.body.scrollHeight) requestAnimationFrame(step);
            else resolve();
          };
          requestAnimationFrame(step);
        }),
    );

    await expect
      .poll(
        () =>
          page.evaluate(
            () =>
              [
                ...document.querySelectorAll(
                  "[data-reveal],[data-stagger],[data-clip],[data-rule]",
                ),
              ].filter((el) => !el.classList.contains("rv-in")).length,
          ),
        { timeout: 8_000 },
      )
      .toBe(0);
  });
});
