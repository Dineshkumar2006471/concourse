'use client';

import { useAgentData } from '@/hooks/useAgentData';

export default function Page() {
  const { transit } = useAgentData();

  return (
    <>

{/*  Top Marquee Ticker  */}

{/*  SideNavBar (Permanent)  */}

{/*  TopAppBar  */}

{/*  Main Content Canvas  */}
<main className="flex-1 lg:ml-[240px] p-margin-mobile md:p-margin-desktop max-w-max-width mx-auto w-full" role="main" aria-label="Transit Logistics">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
{/*  Left Column: Map & Departures  */}
<div className="lg:col-span-8 flex flex-col gap-6">
{/*  Fleet Map Card  */}
<div className="bg-canvas border border-line rounded-xl overflow-hidden relative shadow-sm h-[400px]">
<div className="absolute top-4 left-4 z-10 flex gap-2">
<span className="bg-canvas-alt border border-line px-3 py-1 rounded-full font-label-caps text-label-caps flex items-center gap-1 shadow-sm"><span className="w-2 h-2 rounded-full bg-primary block"></span> {transit?.trains?.length ?? 0} Active</span>
<span className="bg-canvas-alt border border-line px-3 py-1 rounded-full font-label-caps text-label-caps flex items-center gap-1 shadow-sm"><span className="w-2 h-2 rounded-full bg-signal pulse-animation block"></span> {transit?.trains?.filter(t => t.status === 'Delayed').length ?? 0} Delay</span>
</div>
<div className="w-full h-full bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/images/wayfinder.png')" }}>
</div>
</div>
{/*  Arrivals/Departures Board  */}
<div className="bg-canvas border border-line rounded-xl p-6 shadow-sm">
<h2 className="font-headline-md text-headline-md mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">schedule</span> Transit Board</h2>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse" aria-label="Transit departure board">
<thead>
<tr className="border-b border-line text-ink-muted font-label-caps text-label-caps">
<th scope="col" className="py-3 px-4 font-normal">ROUTE</th>
<th scope="col" className="py-3 px-4 font-normal">VEHICLE</th>
<th scope="col" className="py-3 px-4 font-normal">STATUS</th>
<th scope="col" className="py-3 px-4 font-normal">ETA</th>
<th scope="col" className="py-3 px-4 font-normal text-right">CAPACITY</th>
</tr>
</thead>
<tbody className="font-data-md text-data-md">
{transit.trains.map((schedule, i) => (
  <tr key={i} className={`border-b border-line hover:bg-canvas-alt transition-colors ${schedule.status === 'Delayed' ? 'bg-error-container/20' : ''}`}>
  <td className="py-4 px-4 font-headline-md text-headline-md">{schedule.line.split(' ')[0]}</td>
  <td className="py-4 px-4 text-on-surface-variant">{schedule.line}</td>
  <td className="py-4 px-4">
    {schedule.status === 'Delayed' ? (
      <span className="text-error font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">warning</span> DELAYED</span>
    ) : (
      <span className="text-primary font-medium">{schedule.status.toUpperCase()}</span>
    )}
  </td>
  <td className="py-4 px-4">{schedule.time}</td>
  <td className="py-4 px-4 text-right">--</td>
  </tr>
))}
</tbody>
</table>
</div>
</div>
</div>
{/*  Right Column: AI Reasoning Trail  */}
<div className="lg:col-span-4 flex flex-col gap-6">
<div className="bg-canvas-alt border border-line rounded-xl p-6 shadow-sm h-full flex flex-col">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-md text-headline-md flex items-center gap-2"><span className="material-symbols-outlined text-primary">psychology</span> Agent Insight</h3>
<span className="bg-canvas border border-line px-2 py-1 rounded text-xs font-data-md text-on-surface-variant">Logistics AI</span>
</div>
<div className="bg-canvas border-2 border-floodlight rounded-lg p-4 mb-6">
<div className="font-label-caps text-label-caps text-error mb-2 flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-signal pulse-animation"></span>
                            PREDICTED DELAY
                        </div>
<p className="font-body-md text-body-md text-on-surface">Shuttle Line A (SH-A) is experiencing a predicted 10-minute delay due to localized traffic congestion near Gate 4.</p>
</div>
{/*  Reasoning Steps  */}
<div className="flex-1 space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-line before:to-transparent">
<div className="relative flex items-start space-x-3">
<div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-canvas border border-line z-10 mt-1">
<span className="material-symbols-outlined text-[14px] text-ink-muted">sensors</span>
</div>
<div className="min-w-0 flex-1">
<p className="text-sm font-data-md text-on-surface-variant">10:42 AM</p>
<p className="font-body-md text-body-md text-on-surface mt-1">IoT traffic sensors detect 35% speed reduction on Access Road B.</p>
</div>
</div>
<div className="relative flex items-start space-x-3">
<div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-canvas border border-line z-10 mt-1">
<span className="material-symbols-outlined text-[14px] text-ink-muted">directions_bus</span>
</div>
<div className="min-w-0 flex-1">
<p className="text-sm font-data-md text-on-surface-variant">10:43 AM</p>
<p className="font-body-md text-body-md text-on-surface mt-1">Shuttle #12 telemetry confirms speed variance.</p>
</div>
</div>
<div className="relative flex items-start space-x-3">
<div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-surface-container border border-floodlight z-10 mt-1">
<span className="material-symbols-outlined text-[14px] text-primary">model_training</span>
</div>
<div className="min-w-0 flex-1 bg-canvas border border-line rounded-lg p-3 shadow-sm">
<p className="text-sm font-data-md text-primary font-medium">10:44 AM - Prediction Generated</p>
<p className="font-body-sm text-body-sm text-on-surface mt-1">Applying historical match-day congestion models. Confidence: 89%. Impact: 10m delay.</p>
</div>
</div>
<div className="relative flex items-start space-x-3">
<div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-canvas border border-line z-10 mt-1">
<span className="material-symbols-outlined text-[14px] text-ink-muted">alt_route</span>
</div>
<div className="min-w-0 flex-1">
<p className="text-sm font-data-md text-on-surface-variant">10:44 AM</p>
<button className="mt-2 text-sm font-body-md font-medium text-primary border border-line rounded px-3 py-1 hover:bg-surface-container transition-colors">Evaluate Reroute</button>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

    </>
  );
}
