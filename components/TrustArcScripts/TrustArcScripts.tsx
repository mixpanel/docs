export default function TrustArcScripts() {
    const trustArcAutoBlockCoreSrc = `https://consent.trustarc.com/v2/autoblockasset/core.min.js?cmId=9iv2en`;
    const trustArcAutoBlockSrc = `https://consent.trustarc.com/v2/autoblock?cmId=9iv2en`;
    const trustArcInitScriptSrc = `https://consent.trustarc.com/v2/notice/9iv2en`;

    return (
        <>
            <script src={trustArcAutoBlockCoreSrc}></script>
            <script src={trustArcAutoBlockSrc}></script>
            <script type="text/javascript" async src={trustArcInitScriptSrc}></script>
        </>
    )
}