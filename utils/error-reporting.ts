// * Usage: Sends an event with stack trace (if available) to Rollbar
// * For API responses (usually just errors), please use
// * `trackResponse({ sendToRollbar: true })` to send
// * sync'd items to Mixpanel + Rollbar

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

interface LogMessage {
    rollbarLink?: string;
    stack?: string;
    message: string;
}

const logList: { [k in LogLevel]: LogMessage[] } = {
    error: [],
    info: [],
    warn: [],
};

export const errorReportingUtils = {
    getConsoleLogs,
};

function getConsoleLogs(): { [k in LogLevel]: LogMessage[] } {
    return logList;
}

/**
 * Reports some kind of message to console and Rollbar (if defined).
 *
 * Raw strings will be wrapped in an Error to preserve
 * a stack trace.
 *
 * The rollbar client's log methods accept arguments in any order, see
 * https://docs.rollbar.com/docs/rollbarjs-configuration-reference#rollbarlog
 *
 * @param logLevel - error, info, or warn type
 * @param error - the message to display
 * @param info - extra parameters to log, or a nice message
 * @param rest - any additional params for rollbar
 */
function reportToConsoleAndRollbar(
    logLevel: LogLevel,
    message: string | Error,
    info?: any,
    ...rest: any[]
) {
    const maybeError = maybeWrapAsError(message);
    const baseMessage = message instanceof Error ? message.message : message;
    const prettyMessage = `${baseMessage}${info ? `\n` + JSON.stringify(info) : ``}`;
    const logMsg: LogMessage = {
        message: prettyMessage,
        stack: maybeError.stack,
    };
    // eslint-disable-next-line no-console
    console[logLevel](message, info, ...rest);

    // @ts-ignore
    if (isBrowserEnv() && window[`Rollbar`]) {
        // @ts-ignore
        const rollbarResp = window[`Rollbar`]?.[logLevel]?.(
            maybeError,
            info,
            ...rest,
        );
        if (rollbarResp?.uuid) {
            logMsg.rollbarLink = `https://rollbar.com/item/uuid/?uuid=${rollbarResp.uuid}`;
        }
    }
    logList[logLevel].push(logMsg);
}

// For capturing stray error window error events that we don't want to log to Rollbar
export function logTopLevelError(ev: ErrorEvent) {
    // TODO some shared const list for this?
    if (
        [
            `ResizeObserver loop limit exceeded`,
            `ResizeObserver loop completed with undelivered notifications.`,
        ].includes(ev.message)
    ) {
        return;
    }
    const logMsg: LogMessage = {
        message: `${ev.message} (${ev.filename}: ${ev.lineno})`,
    };
    logList.error.push(logMsg);
}

function createReporterFunc(logLevel: LogLevel) {
    return function (message: string | Error, info?: any, ...rest: any[]) {
        reportToConsoleAndRollbar(logLevel, message, info, ...rest);
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
