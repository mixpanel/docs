// * Usage: Sends an event with stack trace (if available) to Sentry
// * For API responses (usually just errors), please use
// * `trackResponse({ sendToSentry: true })` to send
// * sync'd items to Mixpanel + Sentry

import * as SentryCore from "@sentry/core";
import * as Sentry from "@sentry/react";
import type { Integration } from "@sentry/core";

const MIXPANEL_DOMAINS = [
    `https://cdn.mxpnl.com`,
    `https://docs.mixpanel.com`,
    /^https:\/\/docs-git-(.+?)-mixpanel\.vercel\.app/,
];

const ENV = process.env.NODE_ENV;

export const SENTRY_VARS = {
    debug: false,
    environment: ENV,
    stackParser: Sentry.defaultStackParser,
    transport: Sentry.makeFetchTransport,
    dsn: `https://6200201fbaac39435129c90af2fc30cb@o81318.ingest.us.sentry.io/4509680694984704`, // docs project
    sendDefaultPii: false,
    allowUrls: MIXPANEL_DOMAINS,
    // disables session replay by default
    replaysSessionSampleRate: 0,
    ignoreErrors: [`Failed to fetch`, `Load failed`],
    integrations: (integrations: Integration[]) => {
        return [
            /** disables the http integration, we do not care about failed HTTP responses in Sentry */
            ...integrations.filter(
                (integration) => integration.name !== `HttpClient`,
            ),

            /** for production environments, records sessions leading up to an error */
            ...(ENV === `production` ? [Sentry.replayIntegration()] : []),
        ];
    },
};

export function isBrowserEnv(): boolean {
    return typeof window !== `undefined`;
}

enum LogLevel {
    ERROR = `error`,
    WARN = `warn`,
    INFO = `info`,
}

/** wrap a string in Error to generate a trace for logging. */
function maybeWrapAsError(arg: string | Error) {
    if (!(arg instanceof Error)) {
        return new Error(arg);
    } else {
        return arg;
    }
}

/**
 * Reports some kind of message to console and sentry (if defined).
 *
 * Raw strings will be wrapped in an Error to preserve
 * a stack trace.
 *
 * @param logLevel - error, info, or warn type
 * @param error - the message to display
 * @param info - extra parameters to log, or a nice message
 * @param rest - any additional params for sentry
 */
function reportToConsoleAndSentry(
    logLevel: LogLevel,
    message: string | Error,
    info?: any,
    ...rest: any[]
) {
    const maybeError = maybeWrapAsError(message);
    // eslint-disable-next-line no-console
    console[logLevel](message, info, ...rest);

    if (isBrowserEnv() && window.sentry) {
        if (logLevel === LogLevel.ERROR) {
            Sentry.withScope((scope) => {
                scope.setExtras(info);
                scope.setExtras({ ...rest });
                Sentry.captureException(maybeError);
            });
        } else {
            Sentry.withScope((scope) => {
                scope.setExtras(info);
                scope.setExtras({ ...rest });
                Sentry.captureMessage(
                    maybeError.toString(),
                    SentryCore.severityLevelFromString(logLevel),
                );
            });
        }
    }
}

function createReporterFunc(logLevel: LogLevel) {
    return function (message: string | Error, info?: any, ...rest: any[]) {
        reportToConsoleAndSentry(logLevel, message, info, ...rest);
    };
}

/**
 * @example
 * reporter.info(`some message to report`);
 * reporter.error(new Error(`everything is on fire`));
 */
export const reporter = {
    error: createReporterFunc(LogLevel.ERROR),
    warn: createReporterFunc(LogLevel.WARN),
    info: createReporterFunc(LogLevel.INFO),
};
