'use client';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

export function AppShell({ children }: { children: React.ReactNode }) {
  // We use the new Stitch-designed Sidebar and TopBar, centralized here.
  return (
    <div className="min-h-screen bg-canvas-alt flex flex-col">
      <Sidebar />
      <TopBar />
      {/* The main content area. Individual pages should NOT have <aside> or <header> anymore, 
          and should just return their <main> tag (which has lg:ml-[240px] baked into it from Stitch). */}
      {children}
    </div>
  );
}
