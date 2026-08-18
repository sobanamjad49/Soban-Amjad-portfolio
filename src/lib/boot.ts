/**
 * Inline, render-blocking bootstrap. Injected into <head> by the root layout.
 *
 * Two jobs, both of which have to happen before first paint or before the
 * React bundle lands:
 *
 * 1. Resolve the theme, so a stored choice never flashes.
 * 2. Mark the document as script-capable and start the scroll-reveal observer.
 * 3. Track the pointer for the GlowCard spotlight.
 *
 * The reveal engine lives here rather than in a client component on purpose.
 * `html.js [data-reveal]` hides content until it is revealed, and hydration on
 * a throttled mobile CPU was measured at 7.6s — waiting for React would mean
 * seven seconds of blank sections. This runs the moment the DOM is parsed.
 *
 * Everything is wrapped so that a failure un-hides the page instead of leaving
 * it blank: if anything throws, the `js` class comes off and every reveal
 * falls back to its finished state.
 */
const STORAGE_KEY = "sa-theme";

export const bootScript = `
(function(){
  var d = document, root = d.documentElement;
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    if ((stored || (prefersLight ? "light" : "dark")) === "dark") root.classList.add("dark");
  } catch (e) {
    root.classList.add("dark");
  }

  if (!("IntersectionObserver" in window)) return;
  root.classList.add("js");

  function start(){
    try {
      var io = new IntersectionObserver(function(entries){
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (!e.isIntersecting) continue;
          e.target.classList.add("rv-in");
          io.unobserve(e.target);
        }
      }, { rootMargin: "-8% 0px -8% 0px" });

      var nodes = d.querySelectorAll("[data-reveal],[data-stagger],[data-clip],[data-rule],[data-words='view']");
      var pending = [];
      for (var i = 0; i < nodes.length; i++) { io.observe(nodes[i]); pending.push(nodes[i]); }

      /**
       * Safety net. An IntersectionObserver only reports intersections it
       * samples at a frame boundary, so scrolling fast enough to jump a
       * section in a single frame can leave its contents permanently hidden.
       * (Measured: a 400px-per-frame sweep left 20 of 89 elements unrevealed.)
       *
       * Once scrolling settles, anything that has reached the viewport is
       * revealed outright. The list only ever shrinks, and the listener
       * detaches when it empties, so this costs nothing on a normal read.
       */
      var settle;
      function sweep() {
        var limit = window.innerHeight * 0.92;
        for (var j = pending.length - 1; j >= 0; j--) {
          var el = pending[j];
          if (!el.classList.contains("rv-in") && el.getBoundingClientRect().top >= limit) continue;
          el.classList.add("rv-in");
          io.unobserve(el);
          pending.splice(j, 1);
        }
        if (!pending.length) window.removeEventListener("scroll", onScroll);
      }
      function onScroll() {
        clearTimeout(settle);
        settle = setTimeout(sweep, 140);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      glow();
    } catch (e) {
      root.classList.remove("js");
    }
  }

  /**
   * GlowCard spotlight.
   *
   * One delegated listener for all ~32 cards. Each card used to be a client
   * component holding two motion values and two motion-template
   * subscriptions purely so a gradient could follow the cursor, and that cost
   * was paid at hydration by every card on the page, hovered or not. Here it
   * is one passive listener that writes two custom properties.
   *
   * The rect is cached per card and only re-read when the pointer crosses
   * into a different one, and the write is deferred to a frame, so a burst of
   * pointermove events costs at most one layout read and one style write per
   * frame.
   */
  function glow(){
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var card = null, box = null, x = 0, y = 0, queued = false;

    function paint(){
      queued = false;
      if (!card) return;
      card.style.setProperty("--gx", x + "px");
      card.style.setProperty("--gy", y + "px");
    }

    d.addEventListener("pointermove", function(ev){
      var next = ev.target && ev.target.closest ? ev.target.closest("[data-glow]") : null;
      if (next !== card) {
        if (card) { card.style.removeProperty("--gx"); card.style.removeProperty("--gy"); }
        card = next;
        box = card ? card.getBoundingClientRect() : null;
      }
      if (!card) return;
      x = ev.clientX - box.left;
      y = ev.clientY - box.top;
      if (!queued) { queued = true; requestAnimationFrame(paint); }
    }, { passive: true });
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", start);
  else start();
})();
`.trim();

export { STORAGE_KEY };
