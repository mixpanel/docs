// GTM is not GA and we need that to load as early as possible
// Here, we're programatically appending script and noscript tags so we can initialize them from within a useEffect render hook
// This is to avoid meta tag duplication by giving next/head's next-head-count enough time to "settle"

export function addScriptBody({
  scriptBody,
  tagType,
}: {
  scriptBody: string;
  tagType: `script` | `noscript`;
}) {
  const headElement = document.querySelector(`head`);
  const newScriptElement = document.createElement(tagType);
  newScriptElement.textContent = `${scriptBody}`;
  headElement?.appendChild(newScriptElement);
}

export default function insertGTMScriptTags() {
  const GTM_PROPS = {
    id: `GTM-MRDR9SP`,
    auth: `u7v8Q5HaBdyQjwUCnH1m6A`,
  };

  const isProd = process.env.NODE_ENV === `production`;

  const PROJECT_3_MIXPANEL_TOKEN = isProd
    ? `metrics-1`
    : `9c4e9a6caf9f429a7e3821141fc769b7`;

  const MIXPANEL_CUSTOM_LIB_URL = `https://cdn.mxpnl.com/libs/mixpanel.dev.min.js`;

  const initMixpanelScript = `var MIXPANEL_CUSTOM_LIB_URL="${MIXPANEL_CUSTOM_LIB_URL}";(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
        for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
        MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^/)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
        mixpanel.init('${PROJECT_3_MIXPANEL_TOKEN}', {
            api_payload_format: 'json',
            debug: ${!isProd},
            persistence: 'cookie',
            stop_utm_persistence: true,
            record_sessions_percent: 100,
            record_heatmap_data: true,
            record_mask_text_selector: '',
            autocapture: true,
        })
    `;

  const prodGTMScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)
        })(window,document,'script','dataLayer','${GTM_PROPS.id}')`;

  const prodGTMNoScript = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MRDR9SP" height="0" width="0" style="display:none;visibility:hidden" />`;

  const devGTMScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl+'&gtm_auth=u7v8Q5HaBdyQjwUCnH1m6A&gtm_preview=env-32&gtm_cookies_win=x';f.parentNode.insertBefore(j,f)
        })(window,document,'script','dataLayer','${GTM_PROPS.id}')`;

  const devGTMNoScript = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MRDR9SP&gtm_auth=u7v8Q5HaBdyQjwUCnH1m6A&gtm_preview=env-32&gtm_cookies_win=x" height="0" width="0" style="display:none;visibility:hidden" />`;

  // Run
  addScriptBody({ scriptBody: initMixpanelScript, tagType: `script` });
  // initMixpanelScript();
  if (isProd) {
    addScriptBody({ scriptBody: prodGTMScript, tagType: `script` });
    addScriptBody({ scriptBody: prodGTMNoScript, tagType: `noscript` });
  } else {
    addScriptBody({ scriptBody: devGTMScript, tagType: `script` });
    addScriptBody({ scriptBody: devGTMNoScript, tagType: `noscript` });
  }
}
