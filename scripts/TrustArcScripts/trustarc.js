const trustArcAutoBlockCoreSrc = "https://consent.trustarc.com/v2/autoblockasset/core.min.js?cmId=9iv2en";
const trustArcAutoBlockSrc = "https://consent.trustarc.com/v2/autoblock?cmId=9iv2en";
const trustArcInitScriptSrc = "https://consent.trustarc.com/v2/notice/9iv2en?pcookie";

const reloadOnPreferencesScript = `var _STATE={};function runOnce(){!_STATE.hasRunOnce&&window.truste&&truste.eu&&truste.eu.prefclose&&(_STATE.oldValue=truste.eu.bindMap.prefCookie&&truste.eu.bindMap.prefCookie.split(":")[0].replace(/[^\\d.]/g,"-"),_STATE.oldMethod=truste.eu.prefclose,truste.eu.prefclose=function(){_STATE.oldMethod(),truste.eu.bindMap.prefCookie&&truste.eu.bindMap.prefCookie.split(":")[0].replace(/[^\\d.]/g,"-")!==_STATE.oldValue&&setTimeout(function(){window.location.reload()},20)},_STATE.hasRunOnce=!0,_STATE.i&&clearInterval(_STATE.i))}_STATE.i=setInterval(runOnce,10);`;

const reloadOnBannerScript = `document.body.addEventListener("click",function(t){t&&t.target&&("truste-consent-button"===t.target.id||"truste-consent-required"===t.target.id)&&setTimeout(function(){window.location.reload()},1e3)});`;

function addScript(src, attrs = {}) {
  const script = document.createElement("script");
  script.src = src;
  for (const [key, value] of Object.entries(attrs)) {
    script[key] = value;
  }
  document.head.appendChild(script);
}

function addInlineScript(content, attrs = {}) {
  const script = document.createElement("script");
  script.textContent = content;
  for (const [key, value] of Object.entries(attrs)) {
    script[key] = value;
  }
  document.head.appendChild(script);
}

// Head scripts
addScript(trustArcAutoBlockCoreSrc);
addScript(trustArcAutoBlockSrc);
addScript(trustArcInitScriptSrc, { async: true, type: "text/javascript" });

// Body scripts
addInlineScript(reloadOnBannerScript, { async: true });
addInlineScript(reloadOnPreferencesScript);
