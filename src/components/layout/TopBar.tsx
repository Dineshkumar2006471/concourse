'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function TopBar() {
  const pathname = usePathname();
  
  // Format the title based on the route
  let title = "Venue Command";
  if (pathname.includes('/wayfinder')) title = "Wayfinder Ops";
  if (pathname.includes('/pulse')) title = "Pulse Diagnostics";
  if (pathname.includes('/transit')) title = "Transit Logistics";
  if (pathname.includes('/verde')) title = "Verde Sustainability";
  if (pathname.includes('/polyglot')) title = "Polyglot Translation";
  if (pathname.includes('/access')) title = "Access Control";

  return (
    <header className="h-[64px] sticky top-0 z-40 bg-canvas border-b border-line flex justify-between items-center px-4 md:px-8 shadow-sm w-full lg:w-[calc(100%-240px)] lg:ml-[240px]">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">stadium</span>
          <span className="font-display-lg text-headline-md font-bold text-on-background">{title}</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/app" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md hover:text-primary transition-all">Match Day</Link>
          <button className="text-on-surface-variant font-body-md text-body-md hover:text-primary transition-all">Security</button>
          <button className="text-on-surface-variant font-body-md text-body-md hover:text-primary transition-all">Logistics</button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center border border-line rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-secondary transition-all bg-canvas-alt">
          <span className="material-symbols-outlined text-ink-muted text-sm mr-2">search</span>
          <input className="bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface w-48 placeholder-ink-muted" placeholder="Search operations..." type="text"/>
        </div>
        <button className="bg-primary-container text-on-primary-container font-label-caps text-label-caps px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-surface-tint transition-colors">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse"></span>
          Live Feed
        </button>
        <button className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors">EN</button>
        <div className="flex items-center gap-2 border-l border-line pl-4 ml-2">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">apps</span>
          </button>
        </div>
      </div>
    </header>
  );
}
