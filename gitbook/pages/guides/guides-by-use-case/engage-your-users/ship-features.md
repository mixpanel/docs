# How to Safely Ship New Features with Flags

Feature Flags give your team the power to launch confidently, roll back instantly, and measure success in real time. Mixpanel integrates feature flagging directly into your analytics—so every rollout is both controlled and measurable.

## What Are Feature Flags?

Feature Flags decouple deployment (when code ships) from release (when users see it). This means engineers can deploy at any time, while product teams control when—and to whom—new functionality appears.

Mixpanel's native feature flags integrate directly with your data, so you can track adoption, performance, and impact without additional setup.

---

## 1. Prepare for Rollout

Feature flagging starts with setup. Your engineering team must enable flag evaluation within your app before flags can be controlled in Mixpanel.

Steps to take:

{% stepper %}
{% step %}
## Implement the Mixpanel SDK

Make sure to initialize the library with the config option `flags: true`.

- [JavaScript SDK flags setup →](../../tracking-methods/sdks/javascript/javascript-flags.md) 
- [iOS / Swift SDK flags setup →](../../tracking-methods/sdks/swift/swift-flags.md)
- [Android SDK flags setup →](../../tracking-methods/sdks/android/android-flags.md)
{% endstep %}

{% step %}
## Define fallback variants in code to prevent errors if the flag fails to resolve.

{% endstep %}

{% step %}
## Verify flag evaluation using QA Testers before releasing to real users.

{% endstep %}

{% endstepper %}

- ✅ **Do** confirm the SDK setup and flag evaluation flow with Engineering before creating a feature flag in Mixpanel.
- ❌ **Do not** create flags in the UI before the SDK is integrated—the flag won't control behavior in your product until the SDK is configured.

{% hint style="warning" %}
**Pitfall:** Skipping SDK setup causes flags to appear “inactive” even if configured correctly in Mixpanel.
{% endhint %}

---

## 2. Plan a Safe Rollout

With SDK setup complete, decide how to roll out the feature. Use data-driven rollout strategies to manage risk and learn quickly.

Common rollout types:
- **Phased Rollout**: Start with 5–10 % of users, expanding gradually.
- **Cohort-Based Targeting**: Show the feature to specific segments (e.g. power users or new signups).
- **Platform Segmentation**: Launch to a single platform (like iOS) before web.
- **Feature Gate**: Keep a kill switch ready for instant rollback.

{% hint style="info" %}
**Pro tip:** Combine a phased rollout with [alerts](../../features/alerts.md) on key metrics—like conversion or retention—to catch regressions early.
{% endhint %}

---

## 3. Configure Your Flag in Mixpanel

Once your SDK is live, create and manage feature flags directly in the Mixpanel UI.

Steps to take:

{% stepper %}
{% step %}
## Create a new flag.

e.g. `onboarding_v2`
{% endstep %}

{% step %}
## Add a variant and define rollout percentages.

{% endstep %}

{% step %}
## Target users by cohort or run-time properties.

e.g. `platform = android`
{% endstep %}

{% step %}
## Use QA Testers to assign test variants and confirm logic.

{% endstep %}

{% step %}
## Monitor exposure and adoption in real time, adjusting rollout weights as you scale.

{% endstep %}

{% endstepper %}

{% hint style="info" %}
**Pro tip:** Use consistent flag and variant names across systems to keep your analytics clean.
{% endhint %}

### How it Works

When your app loads, the Mixpanel SDK automatically fetches active flags and evaluates which variant each user should see. Once a variant is displayed, Mixpanel logs an exposure event (`$experiment_started`), allowing you to track adoption and impact immediately in your reports—no manual tagging needed.

![Experiments_and_FF.png](/Experiments_and_FF.png)

[📖 Full Feature Flags documentation →](../../featureflags.md)

---

## 4. Monitor and Learn

After launch, use Mixpanel analytics to determine whether to expand, iterate, or revert.

**Tools to Help**
- [Insights](../../reports/insights.md): Measure adoption and engagement by variant.
- [Funnels](../../reports/funnels/funnels-overview.md): Track conversion rates between control and variant users.
- [Boards](../../boards.md): Create a shared rollout dashboard with annotations and alerts.
- [Session Replay](../../session-replay.md): Watch user interactions to diagnose UX issues.

{% hint style="info" %}
**Pro tip:** Use [borrowed properties](../../features/custom-properties.md#borrowed-properties) or [cohorts](../../users/cohorts.md) to track downstream behavior for users exposed to each variant.
{% endhint %}

 👉 **Do this next:** Validate exposure counts and cohort membership before scaling.

 ---

## 5. Govern and Clean Up

Feature flags are powerful, but unmanaged flags become “flag debt.” Maintain hygiene by:
- Assigning an **owner** for each flag.
- **Auditing** monthly or quarterly.
- Keeping flags scoped to one use case.
- **Documenting** rollout intent and success criteria.
- **Sunsetting** flags once a feature reaches 100 % rollout.

{% hint style="info" %}
**Pro tip:** Add flag cleanup reviews to your sprint rituals to stay organized and efficient.
{% endhint %}

---

## Key Takeaways

- Prepare your setup by enabling flag support in your SDK so Mixpanel can control feature visibility.
- Plan safe roll outs using phased or cohort-based release strategies to manage risk.
- Configure and control flags directly in Mixpanel—no redeploy required.
- Monitor adoption and performance with built-in analytics to decide when to expand or revert.
- Govern and clean up flags regularly to prevent confusion and keep your implementation scalable.

📚 **Go deeper:** [Feature Flags overview in Mixpanel Docs](../../featureflags.md)
