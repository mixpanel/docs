// TrustArc cookie consent. Auto-loaded on every page via Mintlify's
// custom .js file convention. On each execution:
//   1. Adds the three TrustArc head scripts (sync, sync, async) if absent.
//   2. Ensures <div id="consent-banner"></div> exists in the body so the
//      notice script can mount the banner.
//   3. Appends a "Cookie Preferences" link to the footer that opens the
//      TrustArc preferences modal.
// Each step is idempotent so SPA route changes don't duplicate DOM nodes.
// Wrapped in an IIFE with `var` so top-level lexical bindings don't
// collide across re-injected classic <script> tags.
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
  var COOKIE_PREF_LINK_CLASS = "mxp-cookie-preferences-link";

  addScriptOnce(TRUSTARC_AUTOBLOCK_CORE_SRC);
  addScriptOnce(TRUSTARC_AUTOBLOCK_SRC);
  addScriptOnce(TRUSTARC_NOTICE_SRC, { async: true, type: "text/javascript" });

  whenBodyReady(function () {
    ensureConsentBanner();
    ensureCookiePreferencesLink();
  });

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

  function ensureCookiePreferencesLink() {
    injectCookiePreferencesLink();
    // Keep a persistent observer so the link is re-injected if Mintlify
    // re-renders the footer on SPA navigation. Disconnect any observer
    // from a prior execution of this script so we don't accumulate.
    if (window.__mxpTrustArcFooterObserver) {
      window.__mxpTrustArcFooterObserver.disconnect();
    }
    var observer = new MutationObserver(injectCookiePreferencesLink);
    observer.observe(document.body, { childList: true, subtree: true });
    window.__mxpTrustArcFooterObserver = observer;
  }

  function injectCookiePreferencesLink() {
    if (document.querySelector("." + COOKIE_PREF_LINK_CLASS)) return true;
    var footer = document.querySelector("footer");
    if (!footer) return false;
    var link = document.createElement("a");
    link.className = COOKIE_PREF_LINK_CLASS;
    link.href = "#";
    link.textContent = "Cookie Preferences";
    link.addEventListener("click", function (event) {
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
    footer.appendChild(link);
    return true;
  }
})();
