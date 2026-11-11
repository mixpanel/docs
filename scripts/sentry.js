// We use Sentry's Loader Script, which lazy-loads the full SDK from the CDN and
// calls window.sentryOnLoad (defined first) to run Sentry.init.

// Wrapped in an IIFE to keep its top-level variables out of the shared global
// scope Mintlify uses for all custom JS files.
(function () {
  const SENTRY_LOADER_SRC =
    "https://js.sentry-cdn.com/6200201fbaac39435129c90af2fc30cb.min.js"; // docs project

  const OWN_URLS = [
    /^https:\/\/docs\.mixpanel\.com\//,
    /^https:\/\/[\w.-]+\.mintlify\.app\//,
  ];

  // Configure sentryOnLoad before adding the Loader Script.
  window.sentryOnLoad = function () {
    // The loader calls this once; remove it so it doesn't linger on the global scope.
    delete window.sentryOnLoad;
    Sentry.init({
      // disables session replay by default
      replaysSessionSampleRate: 0,
      // Generic network noise (failed/cancelled fetches, offline) that adds no signal.
      ignoreErrors: [
        "Failed to fetch",
        "Load failed",
        // Cross-origin scripts loaded without CORS (TrustArc, GTM tags): no message/stack to act on.
        "Script error.",
      ],
      allowUrls: OWN_URLS,
      // allowUrls passes events with no stack frames (link scanners, extensions), so require a frame from our origins.
      beforeSend(event) {
        const values = event.exception?.values;
        if (!values) return event;
        const fromOwnCode = values.some((value) =>
          (value.stacktrace?.frames ?? []).some((frame) =>
            OWN_URLS.some((pattern) => pattern.test(frame.filename ?? "")),
          ),
        );
        return fromOwnCode ? event : null;
      },
    });
  };

  const loader = document.createElement("script");
  loader.src = SENTRY_LOADER_SRC;
  loader.crossOrigin = "anonymous";
  document.head.appendChild(loader);
})();
