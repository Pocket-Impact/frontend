import * as Sentry from '@sentry/nextjs';

export default function SentryErrorBoundary({ children }) {
    return (
        <Sentry.ErrorBoundary fallback={<p>Something went wrong. Our team has been notified.</p>} showDialog={false}>
            {children}
        </Sentry.ErrorBoundary>
    );
}
