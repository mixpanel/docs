import type * as Sentry from '@sentry/core';

declare global {
  interface Window {
    sentry?: Sentry.Client | undefined;
  }
}
