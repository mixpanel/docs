// Session Replay + heatmaps into Mixpanel project 3. Mintlify's built-in Mixpanel
// integration bundles mixpanel-browser 2.45.0 (no replay) and can't be configured, so
// this runs a second, replay-only instance named "docs_replay".
//
// The ES module build is used because the snippet / mixpanel-2-latest.min.js always
// binds to window.mixpanel and bails out if that global already holds a loaded
// library. The module never touches window.mixpanel, so it can't collide with
// Mintlify's instance or a future Mintlify upgrade.
//
// Consent: the library is only loaded once TrustArc allows analytics. The GTM consent
// tag that opts users in elsewhere calls window.mixpanel, which doesn't exist on the
// docs site, so the decision is read from TrustArc directly. The SDK's
// opt_out_tracking_by_default isn't used: it writes the per-token opt-out flag that
// Mintlify's instance shares, which would stop Mintlify's events.
//
// Wrapped in an IIFE with `var` and guarded so re-execution on SPA navigation is a no-op.
(function () {
  if (typeof window === "undefined") return;
  if (window.__mxpDocsReplayStarted) return;
  window.__mxpDocsReplayStarted = true;

  var MIXPANEL_TOKEN = "metrics-1"; // project 3, same token as docs.json
  var INSTANCE_NAME = "docs_replay";
  var MIXPANEL_MODULE_SRC =
    "https://cdn.mxpnl.com/libs/mixpanel-js/dist/mixpanel.module.js";
  // TrustArc category for analytics; matches analyticsStorageId in the GTM consent template.
  var TRUSTARC_ANALYTICS_CATEGORY = 2;
  var CONSENT_POLL_MS = 1000;

  var replayInstance = null;
  var loading = false;

  checkConsent();
  setInterval(checkConsent, CONSENT_POLL_MS);

  function checkConsent() {
    var consent = analyticsConsent();
    if (consent === true && !replayInstance && !loading) {
      startReplay();
    } else if (consent === false && replayInstance) {
      replayInstance.stop_session_recording();
      replayInstance = null;
    }
  }

  // Returns true/false once TrustArc has a decision, null while TrustArc is still loading.
  // Implied consent counts only in regions where TrustArc applies implied behavior
  // (notice_behavior cookie "implied|..."); expressed regions need an explicit opt-in.
  function analyticsConsent() {
    var decision;
    try {
      decision = window.truste.cma.callApi("getGDPRConsentDecision", window.location.hostname);
    } catch (error) {
      return null;
    }
    if (!decision || !decision.consentDecision) return null;
    if (decision.source === "asserted") {
      return decision.consentDecision.indexOf(TRUSTARC_ANALYTICS_CATEGORY) !== -1;
    }
    return /(?:^|;\s*)notice_behavior=implied/.test(document.cookie);
  }

  function startReplay() {
    loading = true;
    import(MIXPANEL_MODULE_SRC)
      .then(function (module) {
        var instance = module.default[INSTANCE_NAME];
        if (instance) {
          instance.start_session_recording();
        } else {
          instance = module.default.init(
            MIXPANEL_TOKEN,
            {
              api_payload_format: "json",
              persistence: "cookie",
              track_pageview: false,
              autocapture: false,
              record_sessions_percent: 100,
              record_heatmap_data: true,
              record_mask_text_selector: "",
              stop_utm_persistence: true,
            },
            INSTANCE_NAME,
          );
        }
        replayInstance = instance;
      })
      .catch(function (error) {
        console.warn("[session-replay] failed to load Mixpanel", error);
      })
      .then(function () {
        loading = false;
      });
  }
})();
