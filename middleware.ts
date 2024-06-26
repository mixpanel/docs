import { NextResponse } from 'next/server'

export function middleware() {
  const response = NextResponse.next()

  // Set custom header
  response.headers.set(`X-Content-Type-Options`, `nosniff`);
  response.headers.set(`Content-Security-Policy`, `default-src 'self' https://*.mixpanel.com https://cdn.mxpnl.com https://cdn-dev.mxpnl.com https://ekr.zendesk.com wss://mixpanelsupport.zendesk.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.trychameleon.com https://*.hotjar.com https://cdn.mxpnl.com https://cdn-dev.mxpnl.com https://cdn.rollbar.com https://js.stripe.com https://*.zdassets.com https://*.zopim.com https://assets.zendesk.com https://www.youtube.com/embed/ https://connect.facebook.net https://apis.google.com https://accounts.google.com; connect-src 'self' blob: data: https://*.trychameleon.com https://*.hotjar.com wss://*.hotjar.com https://*.hotjar.io https://*.mixpanel.com https://cdn.mxpnl.com https://cdn-dev.mxpnl.com https://api.rollbar.com https://api.sprig.com https://*.zdassets.com https://mixpanelsupport.zendesk.com https://*.zopim.com wss://*.zopim.com https://storage.googleapis.com https://*.facebook.com; img-src 'self' blob: data: https://*.chmln-cdn.com https://cdn.mxpnl.com https://cdn-dev.mxpnl.com https://*.zdassets.com https://*.zopim.com https://v2uploads.zopim.io https://*.facebook.com https://*.gravatar.com https://*.wp.com; style-src 'self' 'unsafe-inline' https://cdn.mxpnl.com https://cdn-dev.mxpnl.com; font-src 'self' data: https://cdn.mxpnl.com https://cdn-dev.mxpnl.com; frame-src 'self' https://js.stripe.com https://www.loom.com/embed/ https://player.vimeo.com/video/ https://www.youtube.com/embed/ https://*.facebook.com https://accounts.google.com; worker-src 'self' blob:;`);

  // Return response
  return response
}
