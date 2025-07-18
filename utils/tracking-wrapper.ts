// * Usage: Sends an event with API response info to Mixpanel
// * and sentry (if `sendToSentry` is true)

/**
 * @example
 * ```
 * trackResponse({
 *      APIContext: {
 *          event: APITrackingEvents.Error,
 *      },
 *      eventContext: `${EVENT_CONTEXT} > fun()`,
 *      sendToSentry: true,
 *      ...values,
 * });
 * ```
 */

import { reporter } from "./error-reporting";
import { track } from "./tracking";

// Defines tracked events in docs
export const enum DocsEvents {
    // COMMON EVENTS
    CtaClicked = `Cta Clicked`,
    TryTemplateClick = `Try Feature Launch Template Click`,
    /* clicked on get live demo */
    GetLiveDemoClick = `Get Live Demo Click`,
    /* clicked on explore demo dataset link that links to mixpanel demo dataset project */
    ExploreDemoLinkClick = `Explore Demo Dataset Click`,
    HeaderClick = `Clicked on the Nav Header`,

    // Changelog Events
    SubscribedProductUpdates = `[DOCS] Subscribed to Product Updates`
}

// Defines tracked properties in docs
export const enum DocsEventsProperties {
    // COMMON PROPERTIES
    Team = `Team`,
    NavItem = `Nav Item`,
    ComponentName = `Component`,
    CtaText = `Cta Text`,

    // MARKETING FORM
    // email used to submit marketing related form
    EmailFromMarketingForm = `Email from Marketing Form`,
}

export const BENCHMARKS_SOURCE = `Marketing Landing Page`;
export const MARKETING_LOGIN_PREFIX = `[Marketing Login]`;

// Defines tracked events specific to APIs
export enum APITrackingEvents {
    Error = `API Response Error`,
    Success = `API Response Success`,
}

export enum ResponseType {
    Xhr = `XHR`,
}

type TrackResponseProps = {
    APIContext: {
        event: APITrackingEvents;
        type?: ResponseType;
        response?: string;
        requestUrl?: string;
    };
    eventContext: string; // Eg: be specific about component or function
    accountId?: number;
    formId?: string;
    sendToSentry?: boolean;
    // Whatever else
    [key: string]: any;
};

type EventProperties = {
    [key: string]: any;
};

export const enum LogType {
    Info = `info`,
    Error = `error`,
}

function mixpanelDefined() {
    return typeof mixpanel !== `undefined`;
}

export function trackEvent(
    eventName: DocsEvents,
    properties: EventProperties,
    sendToSentry = false,
    logType = LogType.Info,
) {
    if (mixpanelDefined()) {
        properties[DocsEventsProperties.Team] = `Interactive`;
        mixpanel.track(`${eventName}`, properties);
    }

    if (sendToSentry) {
        if (logType === LogType.Error) {
            reporter.error(eventName, { ...properties });
        } else {
            reporter.info(eventName, { ...properties });
        }
    }
}

export function trackResponse({
    APIContext,
    eventContext,
    ...rest
}: TrackResponseProps) {
    const API_LOG = {
        ...(APIContext.type && { [`Type`]: APIContext.type }),
        ...(APIContext.response && { [`Response`]: APIContext.response }),
        ...(APIContext.requestUrl && {
            [`Request URL`]: APIContext.requestUrl,
        }),
    };
    track(APIContext.event, {
        ...API_LOG,
        [`Event context`]: eventContext,
        [`Team`]: `Interactive`,

        ...(rest.accountId && { [`Account ID`]: rest.accountId }),
        ...(rest.formId && { [`Form ID`]: rest.formId }),
        ...(rest.email_address && {
            [DocsEventsProperties.EmailFromMarketingForm]:
                rest.email_address,
        }),
        ...rest,
    });

    const ERROR_MSG = `Event: ${APIContext.event}, Context: ${eventContext}`;

    if (rest.sendToSentry) {
        APIContext.event === APITrackingEvents.Error
            ? reporter.error(ERROR_MSG, { API_LOG, ...rest })
            : reporter.info(ERROR_MSG, { API_LOG, ...rest });
    }
}
