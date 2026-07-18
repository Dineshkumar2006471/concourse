'use client';

import { useAgentData } from '@/hooks/useAgentData';

export default function Page() {
  const { pulse } = useAgentData();

  return (
    <>

{/*  SideNavBar  */}

{/*  Map & Dashboard Area  */}
<main className="flex-1 lg:ml-[240px] bg-background p-6 flex flex-col relative overflow-y-auto">
{/*  Data Chips Header  */}
<div className="flex gap-4 mb-6">
<div className="bg-canvas border border-line rounded-[16px] p-4 flex-1 flex flex-col">
<span className="font-label-caps text-label-caps text-ink-muted">TOTAL OCCUPANCY</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-data-lg text-headline-lg text-on-surface">{(pulse?.occupancy * 1000)?.toLocaleString() ?? '82,450'}</span>
<span className="font-body-sm text-body-sm text-primary-container flex items-center"><span className="material-symbols-outlined text-sm">arrow_upward</span> 4%</span>
</div>
</div>
<div className="bg-canvas border border-line rounded-[16px] p-4 flex-1 flex flex-col">
<span className="font-label-caps text-label-caps text-ink-muted">FLOW RATE</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-data-lg text-headline-lg text-on-surface">{(pulse?.flowRate / 100)?.toFixed(1) ?? '1.2'}k</span>
<span className="font-body-sm text-body-sm text-ink-muted">/min</span>
</div>
</div>
<div className="bg-canvas border border-line rounded-[16px] p-4 flex-1 flex flex-col relative overflow-hidden">
<div className="absolute inset-0 bg-error-container opacity-20 pulse-ring"></div>
<span className="font-label-caps text-label-caps text-error z-10 relative">HOTSPOTS</span>
<div className="flex items-baseline gap-2 mt-1 z-10 relative">
<span className="font-data-lg text-headline-lg text-error">{pulse?.activeIncidents ?? 3}</span>
<span className="font-body-sm text-body-sm text-ink-muted">Active Alerts</span>
</div>
</div>
</div>
{/*  Digital Twin Map  */}
<div className="flex-1 bg-canvas border border-line rounded-[16px] relative min-h-[500px] overflow-hidden flex items-center justify-center p-8">
{/*  Placeholder for Map Visualization (SVG preferred for real app, using placeholder styling here)  */}
<div className="absolute top-4 right-4 z-10 flex gap-2">
<span className="bg-surface-container px-3 py-1 rounded-full text-xs font-label-caps border border-line">ZONES</span>
<span className="bg-surface-container px-3 py-1 rounded-full text-xs font-label-caps border border-line">CAMERAS</span>
</div>
<div className="w-full max-w-2xl aspect-square relative">
{/*  Abstract Stadium Representation  */}
<div className="absolute inset-0 rounded-full border-[12px] border-line border-opacity-50"></div>
<div className="absolute inset-12 rounded-full border-[24px] border-[#e2e8fc] border-opacity-70"></div>
{/*  Heatmap Segments (Abstracted with Tailwind colors)  */}
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-tertiary-fixed-dim rounded-t-full opacity-80 backdrop-blur-sm"></div> {/*  Orange/High  */}
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary-fixed-dim rounded-b-full opacity-60 backdrop-blur-sm"></div> {/*  Green/Low  */}
<div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-48 bg-[#ffeae4] rounded-l-full opacity-70 backdrop-blur-sm"></div> {/*  Mid  */}
{(pulse?.activeIncidents ?? 0) > 0 && (
  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-48 bg-error-container rounded-r-full opacity-90 backdrop-blur-sm border-2 border-error pulse-ring"></div>
)}
{/*  Center Pitch  */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-surface-container-highest rounded-full flex items-center justify-center border border-outline-variant">
<span className="font-data-md text-data-md text-ink-muted opacity-50">PITCH</span>
</div>
{/*  Alert Marker  */}
{(pulse?.activeIncidents ?? 0) > 0 && (
  <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center justify-center">
  <span className="material-symbols-outlined text-error z-20">warning</span>
  <div className="absolute w-8 h-8 rounded-full bg-error opacity-20 pulse-ring"></div>
  </div>
)}
</div>
</div>
</main>
{/*  AI Assistant Panel  */}

{/*  Define basic custom shape for Agent Avatar  */}


    </>
  );
}
