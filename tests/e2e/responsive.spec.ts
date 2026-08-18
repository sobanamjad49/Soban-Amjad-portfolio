import { test, expect, type Page } from "@playwright/test";

/** The exact breakpoints the brief calls out. */
const BREAKPOINTS = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

/** Scrolls the full page so every `whileInView` animation has settled. */
async function settleAllReveals(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

test.describe("responsive layout", () => {
  for (const width of BREAKPOINTS) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
      await page.goto("/");
      await settleAllReveals(page);

      const { docW, scrollW } = await page.evaluate(() => ({
        docW: document.documentElement.clientWidth,
        scrollW: document.documentElement.scrollWidth,
      }));
      expect(scrollW, `page scrolls horizontally at ${width}px`).toBeLessThanOrEqual(docW + 1);

      // A scrollbar can be suppressed by clipping; also assert the page cannot
      // actually be scrolled sideways.
      const scrolledX = await page.evaluate(() => {
        window.scrollTo(9999, 0);
        const x = window.scrollX;
        window.scrollTo(0, 0);
        return x;
      });
      expect(scrolledX, `page pans sideways at ${width}px`).toBe(0);
    });
  }

  test("no section is wider than the viewport at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/");
    await settleAllReveals(page);

    const wide = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      return [...document.querySelectorAll("section, footer, header")]
        .map((el) => ({ id: el.id || el.tagName, w: Math.round(el.getBoundingClientRect().width) }))
        .filter((s) => s.w > docW + 1);
    });
    expect(wide).toEqual([]);
  });
});

test.describe("touch targets", () => {
  test("interactive controls are at least 32px tall on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settleAllReveals(page);

    const small = await page.evaluate(() => {
      const out: { label: string; w: number; h: number }[] = [];
      for (const node of document.querySelectorAll("a, button, [role='tab']")) {
        const el = node as HTMLElement;
        // offsetWidth/Height are the laid-out box. getBoundingClientRect would
        // fold in the scroll-driven scale transforms that some cards are still
        // easing through, reporting a 32px control as 30px.
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        if (w === 0 || h === 0) continue;
        // The skip link is visually hidden until focused; it sizes up then.
        if (el.textContent?.trim() === "Skip to content") continue;
        if (h < 32 || w < 24) {
          out.push({
            label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40),
            w,
            h,
          });
        }
      }
      return out;
    });
    expect(small).toEqual([]);
  });
});
