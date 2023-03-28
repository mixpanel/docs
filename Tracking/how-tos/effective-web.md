---
title: "Effective Web Tracking"
slug: "effective-web-tracking"
hidden: false
---

This document gives tips for implementing scalable, maintainable server-side tracking. If you're just getting started, check out the [quickstart](doc:javascript-quickstart).


# Use a Proxy
We recommend using a proxy server to track events from your website to Mixpanel, which makes your tracking much more reliable since it's less susceptible to ad-blockers. This means that instead of events going straight from your website -> Mixpanel, they will go from your website -> your proxy -> Mixpanel.

### Step 1: Spin up a proxy server
Here is a sample nginx config:

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fmixpanel%2Ftracking-proxy%2Fblob%2F126203cda52abd1564b8d82ab5dd88f67e7c27a5%2Fnginx.conf&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

See more details in [Github](https://github.com/mixpanel/tracking-proxy)
