'use client';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas-alt flex flex-col">
      {/* Skip Navigation Link — keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-pitch focus:text-on-primary focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Sidebar />
      <TopBar />
      {/* Main content area. Individual pages should return their <main> tag
          which has lg:ml-[240px] baked into it from Stitch. */}
      <div id="main-content">
        {children}
      </div>
    </div>
  );
}
