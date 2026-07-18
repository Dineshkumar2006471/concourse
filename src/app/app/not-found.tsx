import Link from 'next/link';

/**
 * Custom 404 page for the /app route group.
 */
export default function AppNotFound() {
  return (
    <div className="flex-1 lg:ml-[240px] flex items-center justify-center min-h-[60vh]">
      <div className="bg-canvas border border-line rounded-2xl p-8 max-w-lg w-full text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl text-ink-muted">search_off</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
          Page Not Found
        </h2>
        <p className="font-body-md text-body-md text-ink-muted mb-6">
          The agent screen you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/app"
          className="inline-block bg-pitch text-on-primary font-headline-md text-body-md px-6 py-3 rounded-lg hover:bg-pitch-hover transition-colors"
        >
          Back to Command Center
        </Link>
      </div>
    </div>
  );
}
