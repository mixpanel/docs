# Session Replay

## **Overview**

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

## **Privacy**

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
