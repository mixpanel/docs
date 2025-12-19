import { addScriptBody } from "../GTMScripts/GTMScripts";

export default function insertTrustArcScriptTags() {
    const trustArcAutoBlockCore = `<script src="https://consent.trustarc.com/v2/autoblockasset/core.min.js?cmId=9iv2en"></script>`;
    const trustArcAutoBlock = `<script src="https://consent.trustarc.com/v2/autoblock?cmId=9iv2en"></script>`;

    const trustArcInitScript = `<script type="text/javascript" async="async" src="https://consent.trustarc.com/v2/notice/9iv2en"></script>`;
    // Run
    addScriptBody({ scriptBody: trustArcAutoBlockCore, tagType: `script` });
    addScriptBody({ scriptBody: trustArcAutoBlock, tagType: `script` });
    addScriptBody({ scriptBody: trustArcInitScript, tagType: `script` });
}
