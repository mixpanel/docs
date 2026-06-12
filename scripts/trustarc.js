// TrustArc cookie consent. Auto-loaded on every page via Mintlify's
// custom .js file convention. On each execution:
//   1. Adds the three TrustArc head scripts (sync, sync, async) if absent.
//   2. Ensures <div id="consent-banner"></div> exists in the body so the
//      notice script can mount the banner.
//   3. Binds a delegated click handler to the "Cookie Preferences" footer
//      link (declared in docs.json footer.links) so it opens the TrustArc
//      preferences modal.
// Each step is idempotent so SPA route changes don't duplicate DOM nodes or
// stack listeners. Wrapped in an IIFE with `var` so top-level lexical
// bindings don't collide across re-injected classic <script> tags.
(function () {
  if (typeof window === "undefined") return;

  var TRUSTARC_CM_ID = "u7wymg"; // Temp test ID to be updated prior to cutover in TOF-212
  var TRUSTARC_AUTOBLOCK_CORE_SRC =
    "https://consent.trustarc.com/v2/autoblockasset/core.min.js?cmId=" + TRUSTARC_CM_ID;
  var TRUSTARC_AUTOBLOCK_SRC =
    "https://consent.trustarc.com/v2/autoblock?cmId=" + TRUSTARC_CM_ID;
  var TRUSTARC_NOTICE_SRC =
    "https://consent.trustarc.com/v2/notice/" + TRUSTARC_CM_ID + "?pcookie";

  var CONSENT_BANNER_ID = "consent-banner";
  // Matches the footer link declared in docs.json footer.links. The sentinel
  // hash href carries no navigation of its own — the handler below intercepts
  // it. `$=` tolerates Mintlify prefixing the current path onto the hash.
  var COOKIE_PREF_SELECTOR = 'footer a[href$="#cookie-preferences"]';

  addScriptOnce(TRUSTARC_AUTOBLOCK_CORE_SRC);
  addScriptOnce(TRUSTARC_AUTOBLOCK_SRC);
  addScriptOnce(TRUSTARC_NOTICE_SRC, { async: true, type: "text/javascript" });

  whenBodyReady(ensureConsentBanner);
  bindCookiePreferencesHandler();

  function addScriptOnce(src, attrs) {
    if (document.querySelector('script[src="' + src + '"]')) return;
    var script = document.createElement("script");
    script.src = src;
    if (attrs) {
      for (var key in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, key)) {
          script[key] = attrs[key];
        }
      }
    }
    document.head.appendChild(script);
  }

  function whenBodyReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function ensureConsentBanner() {
    if (document.getElementById(CONSENT_BANNER_ID)) return;
    var div = document.createElement("div");
    div.id = CONSENT_BANNER_ID;
    document.body.appendChild(div);
  }

  // The footer link is rendered by Mintlify from docs.json, so it persists
  // across SPA navigation on its own. A single delegated listener on document
  // (guarded so re-execution of this script doesn't stack listeners) wires it
  // to TrustArc — no DOM injection or footer-rerender watching needed.
  function bindCookiePreferencesHandler() {
    if (window.__mxpTrustArcClickBound) return;
    window.__mxpTrustArcClickBound = true;
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || typeof target.closest !== "function") return;
      if (!target.closest(COOKIE_PREF_SELECTOR)) return;
      event.preventDefault();
      if (
        window.truste &&
        window.truste.eu &&
        typeof window.truste.eu.clickListener === "function"
      ) {
        window.truste.eu.clickListener();
      } else {
        console.warn("[trustarc] Preferences manager not loaded — check that the current origin is on the cmId allowlist.");
      }
    });
  }
})();
