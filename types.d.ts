import type * as Sentry from '@sentry/core';

interface Window {
  sentry?: Sentry.Client | undefined;
}
