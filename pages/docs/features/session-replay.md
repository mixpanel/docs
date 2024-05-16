# Session Replay (Beta)

## Overview

Mixpanel Session Replay is the fastest way to understand the whole picture about your customers and make better product decisions, by combining quantitative and qualitative user insights. 

When digging into customer journeys in Mixpanel’s analytics, you can understand “where do customers drop-off?” And now, Mixpanel Session Replay enables you to quickly follow-up with, “why do customers drop off?”

## Availability

Currently, Session Replay is currently in invite-only beta access for:

- customers on our [Enterprise plan](https://www.notion.so/Session-Replay-Docs-v1-c32c9817ec1b49798d1ca7d1ccc5880c?pvs=21)
- projects without [EU Data Residency](https://docs.mixpanel.com/docs/privacy/eu-residency) enabled

You can join the waitlist for beta access [here](https://mixpanel.com/m/session-replay-beta/).

For any questions about Session Replay or beta access, please reach out to your Account Manager.

## **Using Session Replay**

Session Replay can be accessed in two places:

1. From User Profile page
2. From Mixpanel reports

**From User Profile page**

In any user’s profile page, Click the ‘View Replays’ button to watch replays from that user. From here, you will be taken to our Replay Player.

![replayProfileEntry](/replayProfileEntryPoint.png)

**From Mixpanel reports**

Click any point on a chart for Event and Funnel metrics, and select ‘View Replays’ to view replays that show that event being fired. From here, you will be taken to our Replay Player. 

![replayReportEntry](/replayReportEntryPoint.png)

*Note: reports entry point is currently supported for Event and Funnel metrics only.*

## **Replay Player**

![replayHeroImage](/replayHeroImage.png)

The Replay Player allows you to watch replays, as well as:

- Expand the player to full-screen
- Copy a URL to share with your teammates
- Change the playback speed
- Automatically skip periods of the replay where user is inactive

The Replay Feed on the left of the player also allows you to:

- sort replays by recency
- search for replays by user's name / email, replay date, or user ID

## Legal (Beta Terms)

Our Session Replay Beta Service Addendum can be found [here](https://mixpanel.com/legal/session-replay-beta-service-addendum/).

## **FAQ**

### **Is Session Replay available for mobile?**

To start, Session Replay is available only for web-based applications (including mobile web). We hope to offer mobile support in the near future. 

### Can I prevent Session Replay from recording sensitive content?

By default, all on-screen text elements are masked in replays. Additionally, you can customize how you initialize our SDK to fully control (1) where to record and (2) whom to record. For more details, please see our [implementation docs](https://docs-k17v3wqal-mixpanel.vercel.app/docs/tracking-methods/sdks/javascript#session-replay-beta).

### How long are replays stored?

30 days.

### Does Session Replay work on projects with EU Data Residency enabled?

Not currently, but we plan to add support soon.

### How soon are Replays available for viewing after a session begins?

There is about a ~1 minute delay between when recordings are captured and when they appear in Mixpanel.  

---  
<br>

## Appendix: Session Replay Privacy Controls
**Last updated May 9th, 2024**

### Introduction

Mixpanel offers a privacy-first approach to Session Replay, including features such as data masking. Mixpanel’s Session Replay privacy controls were designed to assist customers in protecting end user privacy.

Data privacy regulations are rapidly evolving and vary considerably across states and countries. A consistent requirement across many data privacy regulations for website operators is disclosing to end users that their personal information is being collected, often in a privacy notice. Before implementing Session Replay on your website, a best practice is to review your privacy notice with legal counsel to ensure it remains accurate and compliant with data privacy laws.

### How does Session Replay work?

Session Replay captures the Document Object Model (DOM) structure and changes to it. Mixpanel then reconstructs the web page, applying recorded events at the time an end user completed them. Within Mixpanel’s platform, you can view a reconstruction of your end user’s screen as they navigate your website. However, Session Replay is not a video recording of your end user’s screen and end user actions are not literally video-recorded.

### How does masking work? What are the high-level technical details?

Masked data is suppressed client-side, meaning it is not collected in its original form by Mixpanel’s SDK, and the data is not stored on Mixpanel servers. Masked data appears in Mixpanel as [****].

### Configuring Privacy Controls

Mixpanel offers its customers a range of privacy controls to limit the data captured by Session Replay, which are summarized in the table below and detailed further on this page.

| Element | Description | Mask Text Mode (Mixpanel’s Default) | Mask User Input Mode |
| --- | --- | --- | --- |
| Input | Textareas, select | Masked (cannot be unmasked) | Masked (cannot be unmasked) |
| text | Non-input text | Masked (cannot be unmasked) | Unmasked, with the ability to mask specific text elements |
| Non-text elements | Video and image elements | Ingested by default (not masked) with the ability to block specific non-text elements | Ingested by default (not masked) with the ability to block specific non-text elements |

### Mask Text Mode (Mixpanel’s Session Replay default privacy setting)

By default, Mixpanel attempts to mask all HTML text and user input text when you enable Session Replay. This masked content on your webpage is replaced with [****].

Here is an example of what “Mask Text Mode” could look like:

![replayMaskTextMode](/replayMaskTextMode.png)

### Mask User Input Mode

Mixpanel empowers its customers to decide to record all non-input text as-is, while continuing to mask input text. Inputs are replaced with [****].

`mixpanel.init(YOUR_PROJECT_TOKEN, {record_mask_text_selector: ''})`

Here is an example of what “Mask User Input Mode” could look like:

![replayMaskInputMode](/replayMaskInputMode.png)

With the goal of offering a privacy-first product, Mixpanel’s Session Replay cannot be configured to capture input form fields such as textareas.

### Mask specific elements

You can tag the privacy level of an individual HTML element using one the following methods:

1. For masking text contents, add the class name “.rr-mask”
2. To mask the entire contents of an element, add the class name “.rr-block”

The example below demonstrates how you can override certain elements in your HTML to customize your masking:

`<div class="text.rr-mask">This text is masked!</div>`

`<img src="https://image.com" class="rr-block"/>`


### Other Elements (e.g., images, video)

If you would like to block Mixpanel’s Session Replay from capturing video, images, or other non-text elements, you should add the CSS class name “.rr-block” to elements that should not be captured. This will cause the element's contents to no longer be captured. In subsequent playback, this element will be rendered with a placeholder element (e.g., an empty box of similar size).

### Disabling replay collection

Once enabled, Session Replay runs on your site until either:

- The user leaves your site
- You call `mixpanel.stop_session_recording()`

Call mixpanel.stop_session_recording() before a user navigates to a restricted area of your site to disable replay collection while the user is in that area.

To restart replay collection, call `mixpanel.start_session_recording()` to re-add the plugin.

### User Opt-Out

Mixpanel’s Session Replay follows Mixpanel’s [standard SDK opt-out setting](https://docs.mixpanel.com/docs/privacy/end-user-data-management#opt-out-users).

### Data Deletion

Deletion requests for Session Replay use Mixpanel’s standard end user management process for events documented [here](https://docs.mixpanel.com/docs/privacy/end-user-data-management).

### Data Retention

Mixpanel retains Session Replays for 30 days from the date the Session Replay is ingested and becomes available for viewing within Mixpanel.

### EU Data Residency 

Session Replay is not currently available to Mixpanel customers who use the EU data center. This functionality is coming soon.    
