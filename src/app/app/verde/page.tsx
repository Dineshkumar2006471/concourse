'use client';

import { useAgentData } from '@/hooks/useAgentData';

export default function Page() {
  const { verde, pulse } = useAgentData();
  return (
    <>

{/*  JSON Component: SideNavBar  */}
{/*  active item: Verde  */}

{/*  Page Content  */}
<main className="flex-1 lg:ml-[240px] overflow-y-auto bg-canvas-alt p-margin-mobile md:p-margin-desktop h-full w-full max-w-max-width mx-auto" role="main" aria-label="Verde Sustainability Dashboard">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
{/*  Left Column: Dashboard Canvas  */}
<div className="lg:col-span-8 space-y-6 flex flex-col">
{/*  Title Area  */}
<div className="flex justify-between items-end">
<div>
<h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Verde <span className="text-ink-muted">— Sustainability</span></h1>
<p className="font-body-lg text-body-lg text-ink-muted mt-2">Real-time resource utilization and environmental impact tracking.</p>
</div>
<div className="flex items-center gap-2 bg-canvas px-3 py-1.5 rounded-full border border-line">
<span className="w-2 h-2 rounded-full bg-primary pulse-animation"></span>
<span className="font-label-caps text-label-caps text-on-surface">LIVE SYNC</span>
</div>
</div>
{/*  Bento Grid Data Cards  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/*  Power Draw  */}
<div className="bg-canvas border border-line rounded-2xl p-6 relative overflow-hidden group hover:border-floodlight transition-colors">
<div className="flex justify-between items-start mb-8">
<span className="material-symbols-outlined text-primary" data-icon="bolt">bolt</span>
<span className="bg-surface-container-high text-on-surface px-2 py-1 rounded font-label-caps text-[10px]">GRID LOAD</span>
</div>
<div>
<p className="font-headline-md text-body-sm text-ink-muted mb-1">Total Power Draw</p>
<div className="flex items-baseline gap-2">
<span className="font-data-lg text-display-lg text-on-surface tracking-tighter">{verde.powerDraw ? verde.powerDraw.toFixed(1) : ((pulse?.occupancy ?? 80) / 20).toFixed(1)}</span>
<span className="font-data-md text-data-md text-ink-muted">MW</span>
</div>
</div>
{/*  Mini sparkline mock  */}
<div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none" style={{ "background": "linear-gradient(to top, theme('colors.primary-container'), transparent)" }}></div>
</div>
{/*  Water Usage  */}
<div className="bg-canvas border border-line rounded-2xl p-6 relative overflow-hidden hover:border-floodlight transition-colors">
<div className="flex justify-between items-start mb-8">
<span className="material-symbols-outlined text-secondary" data-icon="water_drop">water_drop</span>
<span className="bg-surface-container-high text-on-surface px-2 py-1 rounded font-label-caps text-[10px]">FLOW RATE</span>
</div>
<div>
<p className="font-headline-md text-body-sm text-ink-muted mb-1">Potable Water Usage</p>
<div className="flex items-baseline gap-2">
<span className="font-data-lg text-display-lg text-on-surface tracking-tighter">{verde.waterUsage ? verde.waterUsage.toLocaleString() : ((pulse?.flowRate ?? 100) * 12).toLocaleString()}</span>
<span className="font-data-md text-data-md text-ink-muted">L/min</span>
</div>
</div>
</div>
</div>
{/*  Wide Card: Carbon Footprint Tracker  */}
<div className="bg-canvas border border-line rounded-2xl p-6 flex-1 flex flex-col min-h-[300px]">
<div className="flex justify-between items-center mb-6">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Carbon Footprint Tracker</h3>
<p className="font-body-sm text-body-sm text-ink-muted">Cumulative Scope 1 &amp; 2 emissions vs. baseline</p>
</div>
<button className="font-label-caps text-label-caps text-primary border border-line px-3 py-1.5 rounded hover:bg-surface-container transition-colors">EXPORT LOG</button>
</div>
<div className="flex-1 border border-line border-dashed rounded-lg flex items-center justify-center bg-canvas-alt relative overflow-hidden">
{/*  Placeholder for complex chart/visualization  */}
<div className="absolute inset-0 flex items-center justify-center opacity-50">
<span className="material-symbols-outlined text-4xl text-outline-variant" data-icon="monitoring">monitoring</span>
</div>
<div className="absolute bottom-4 left-4 bg-canvas/80 backdrop-blur border border-line px-3 py-2 rounded">
<div className="font-data-md text-data-md text-on-surface">Target: -15%</div>
<div className="font-data-md text-label-caps text-primary">Current: {verde.carbonFootprint || '-12.4%'}</div>
</div>
</div>
</div>
</div>
{/*  Right Column: Agent Reasoning Trail  */}
<div className="lg:col-span-4 h-full flex flex-col">
<div className="bg-canvas border border-line border-t-2 border-t-primary rounded-2xl flex-1 flex flex-col overflow-hidden shadow-sm">
{/*  Agent Header  */}
<div className="p-4 border-b border-line bg-surface flex items-center gap-3">
<div className="w-10 h-10 bg-primary-container agent-avatar flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-primary-container" data-icon="eco" style={{ "fontVariationSettings": "'FILL' 1" }}>eco</span>
</div>
<div>
<h3 className="font-headline-md text-body-lg text-on-surface leading-tight">Verde Agent</h3>
<p className="font-data-md text-[11px] text-ink-muted">AI Sustainability Optimizer</p>
</div>
<span className="ml-auto bg-primary-container/20 text-primary px-2 py-0.5 rounded font-label-caps text-[10px]">ACTIVE</span>
</div>
{/*  Reasoning Trail  */}
<div className="p-6 flex-1 overflow-y-auto bg-canvas-alt">
<h4 className="font-label-caps text-label-caps text-ink-muted mb-6">REASONING TRAIL</h4>
<div className="space-y-6 relative ml-4">
{verde.reasoningTrail?.map((log, index) => (
  <div key={index} className="relative reasoning-step reasoning-line animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className={`absolute -left-[20px] top-1 w-2 h-2 rounded-full border-2 border-canvas-alt ring-2 ${log.type === 'recommendation' ? 'bg-primary ring-primary/30 pulse-animation' : 'bg-outline-variant ring-line'}`}></div>
    <p className={`font-data-md text-xs mb-1 ${log.type === 'recommendation' ? 'text-primary' : 'text-ink-muted'}`}>{log.time}</p>
    {log.type === 'recommendation' ? (
      <div className="bg-canvas border border-line rounded-lg p-3 mt-2 shadow-sm">
        <p className="font-body-md text-body-md text-on-surface font-medium mb-2">{log.message}</p>
        <p className="font-body-sm text-body-sm text-ink-muted mb-3">{log.submessage}</p>
        <div className="bg-surface-container p-2 rounded text-xs font-data-md text-on-surface-variant mb-3 flex justify-between">
            <span>Est. Power Saving:</span>
            <span className="text-primary font-medium">{log.savings}</span>
        </div>
        <div className="flex gap-2">
            <button className="flex-1 bg-pitch text-on-primary font-headline-md text-xs py-1.5 rounded hover:bg-pitch-hover transition-colors">Execute</button>
            <button className="flex-1 bg-transparent border border-line text-on-surface font-headline-md text-xs py-1.5 rounded hover:bg-surface transition-colors">Dismiss</button>
        </div>
      </div>
    ) : (
      <p className="font-body-sm text-body-sm text-on-surface-variant">{log.message}</p>
    )}
  </div>
))}
</div>
</div>
</div>
</div>
</div>
</main>

    </>
  );
}
