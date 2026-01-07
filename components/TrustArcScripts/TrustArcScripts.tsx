export function TrustArcHeadScripts() {
    const trustArcAutoBlockCoreSrc = `https://consent.trustarc.com/v2/autoblockasset/core.min.js?cmId=9iv2en`;
    const trustArcAutoBlockSrc = `https://consent.trustarc.com/v2/autoblock?cmId=9iv2en`;
    const trustArcInitScriptSrc = `https://consent.trustarc.com/v2/notice/9iv2en`;

    return (
        <>
            <script src={trustArcAutoBlockCoreSrc} async />
            <script src={trustArcAutoBlockSrc} async />
            <script type="text/javascript" async src={trustArcInitScriptSrc} />
        </>
    );
}

export function TrustArcBodyScripts() {
    const reloadOnPreferencesScript = `var _STATE={};function runOnce(){!_STATE.hasRunOnce&&window.truste&&truste.eu&&truste.eu.prefclose&&(_STATE.oldValue=truste.eu.bindMap.prefCookie&&truste.eu.bindMap.prefCookie.split(":")[0].replace(/[^\\d.]/g,"-"),_STATE.oldMethod=truste.eu.prefclose,truste.eu.prefclose=function(){_STATE.oldMethod(),truste.eu.bindMap.prefCookie&&truste.eu.bindMap.prefCookie.split(":")[0].replace(/[^\\d.]/g,"-")!==_STATE.oldValue&&setTimeout(function(){window.location.reload()},20)},_STATE.hasRunOnce=!0,_STATE.i&&clearInterval(_STATE.i))}_STATE.i=setInterval(runOnce,10);`;

    const reloadOnBannerScript = `document.body.addEventListener("click",function(t){t&&t.target&&("truste-consent-button"===t.target.id||"truste-consent-required"===t.target.id)&&setTimeout(function(){window.location.reload()},1e3)});`;

    return (
        <>
            <script
                async
                // eslint-disable-next-line @typescript-eslint/naming-convention
                dangerouslySetInnerHTML={{ __html: reloadOnBannerScript }}
            />
            <script
                // eslint-disable-next-line @typescript-eslint/naming-convention
                dangerouslySetInnerHTML={{ __html: reloadOnPreferencesScript }}
            />
        </>
    );
}
