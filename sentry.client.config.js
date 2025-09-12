import * as Sentry from '@sentry/nextjs';

Sentry.init({
        // eslint-disable-next-line no-undef
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    // Add more options as needed
});
