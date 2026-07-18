'use client';

import { useEffect } from 'react';

/**
 * Route-segment error boundary for the /app route group.
 * Catches runtime errors in any agent page and shows a
 * graceful fallback UI with a retry button.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Concourse Error Boundary]', error);
  }, [error]);

  return (
    <div className="flex-1 lg:ml-[240px] flex items-center justify-center min-h-[60vh]">
      <div className="bg-canvas border border-line rounded-2xl p-8 max-w-lg w-full text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-error-container flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl text-error">error</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
          Something went wrong
        </h2>
        <p className="font-body-md text-body-md text-ink-muted mb-6">
          An unexpected error occurred while loading this agent screen. 
          This has been logged for investigation.
        </p>
        {error.digest && (
          <p className="font-data-md text-data-md text-ink-muted mb-4">
            Error ID: <code className="bg-surface-container px-2 py-0.5 rounded">{error.digest}</code>
          </p>
        )}
        <button
          onClick={reset}
          className="bg-pitch text-on-primary font-headline-md text-body-md px-6 py-3 rounded-lg hover:bg-pitch-hover transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
