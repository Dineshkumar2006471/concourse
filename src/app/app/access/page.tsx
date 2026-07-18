'use client';

import { useAgentData } from '@/hooks/useAgentData';

export default function Page() {
  const { access, pulse } = useAgentData();
  return (
    <>

{/*  SideNavBar  */}

{/*  Main Content Area  */}

{/*  TopAppBar  */}

{/*  Main Canvas  */}
<main className="flex-1 lg:ml-[240px] p-margin-mobile md:p-margin-desktop max-w-max-width mx-auto w-full">
{/*  Header Section  */}
<div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface">Access — Secure Operations</h1>
<p className="text-on-surface-variant text-body-lg font-body-lg mt-1">Real-time perimeter monitoring and credential validation.</p>
</div>
<div className="flex items-center gap-3">
<button className="px-4 py-2 bg-canvas border border-line rounded-lg text-on-surface font-body-md hover:bg-surface-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">filter_list</span> Filter Zones
                    </button>
<button className="px-4 py-2 bg-pitch text-white rounded-lg font-headline-md hover:bg-pitch-hover transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">lock_reset</span> Lockdown Override
                    </button>
</div>
</div>
{/*  Bento Grid Layout  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
{/*  Left Column (Primary Focus)  */}
<div className="md:col-span-12 lg:col-span-8 flex flex-col gap-gutter">
{/*  Alert Banner  */}
<div className="bg-primary-container bg-opacity-10 border border-primary-container rounded-lg p-4 flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
<span className="material-symbols-outlined">shield_locked</span>
</div>
<div>
<h3 className="font-headline-md text-body-lg text-on-surface">Perimeter Secure</h3>
<p className="text-on-surface-variant text-body-sm">All access control points operational.</p>
</div>
</div>
<div className="text-right">
<span className="font-data-lg text-headline-lg text-primary block">{access.detectedBreaches ?? pulse?.activeIncidents ?? 0}</span>
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Detected Breaches</span>
</div>
</div>
{/*  Security Map Card  */}
<div className="bg-canvas border border-line rounded-xl overflow-hidden flex-1 flex flex-col min-h-[400px]">
<div className="p-4 border-b border-line flex justify-between items-center bg-canvas-alt">
<h2 className="font-headline-md text-body-lg text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-ink-muted">map</span>
                                Zone Control Map
                            </h2>
<span className="font-label-caps text-label-caps bg-canvas border border-line px-2 py-1 rounded text-ink-muted">LIVE SYNC</span>
</div>
<div className="flex-1 relative bg-surface-container-low">
{/*  Simulated Map Layer  */}
<div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80" data-alt="A highly detailed, schematic top-down map of a massive modern sports stadium and its surrounding perimeter. The map uses a sleek, high-contrast dark mode aesthetic with bright neon green and blue lines delineating security zones, gates, and VIP areas. Data visualization overlays indicate crowd density in various sectors. The style is strictly architectural and technological, resembling a professional security command center display." data-location="New York" style={{ backgroundImage: "url('/images/stadium_aerial_real.png')", backgroundSize: 'cover' }}>
</div>
{/*  Map Overlays  */}
<div className="absolute top-4 left-4 flex flex-col gap-2">
<div className="bg-canvas/90 backdrop-blur-sm border border-line p-2 rounded flex items-center gap-2 text-body-sm shadow-sm">
<span className="w-2 h-2 rounded-full bg-primary"></span> Zone A: Active
                                </div>
<div className="bg-canvas/90 backdrop-blur-sm border border-line p-2 rounded flex items-center gap-2 text-body-sm shadow-sm">
<span className="w-2 h-2 rounded-full bg-primary"></span> Zone B: Active
                                </div>
<div className="bg-canvas/90 backdrop-blur-sm border border-line p-2 rounded flex items-center gap-2 text-body-sm shadow-sm">
<span className="w-2 h-2 rounded-full bg-tertiary"></span> Zone C: Restricting
                                </div>
</div>
</div>
</div>
{/*  Credential Metrics Row  */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
<div className="bg-canvas border border-line rounded-lg p-6 flex flex-col">
<span className="font-label-caps text-label-caps text-on-surface-variant mb-2">Valid Scans (1h)</span>
<span className="font-data-lg text-display-lg text-on-surface">{(access.validScans || ((pulse?.occupancy ?? 80) * 156)).toLocaleString()}</span>
<div className="mt-2 text-primary text-body-sm flex items-center gap-1">
<span className="material-symbols-outlined text-sm">trending_up</span> +5% vs avg
                            </div>
</div>
<div className="bg-canvas border border-line rounded-lg p-6 flex flex-col">
<span className="font-label-caps text-label-caps text-on-surface-variant mb-2">Invalid Attempts</span>
<span className="font-data-lg text-display-lg text-on-surface">{access.invalidAttempts || ((pulse?.activeIncidents ?? 0) * 7 + 2)}</span>
<div className="mt-2 text-ink-muted text-body-sm flex items-center gap-1">
<span className="material-symbols-outlined text-sm">horizontal_rule</span> Stable
                            </div>
</div>
<div className="bg-canvas border border-line rounded-lg p-6 flex flex-col">
<span className="font-label-caps text-label-caps text-on-surface-variant mb-2">VIP Clearances</span>
<span className="font-data-lg text-display-lg text-on-surface">{access.vipClearances || 345}</span>
<div className="mt-2 text-secondary text-body-sm flex items-center gap-1">
<span className="material-symbols-outlined text-sm">star</span> Processing Active
                            </div>
</div>
</div>
</div>
{/*  Right Column (Reasoning Trail)  */}
<div className="md:col-span-12 lg:col-span-4 flex flex-col gap-gutter h-full">
<div className="bg-canvas-alt border border-line rounded-xl p-5 flex flex-col h-full">
<div className="flex items-center justify-between mb-6 border-b border-line pb-4">
<h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined">memory</span> AI Reasoning Trail
                            </h2>
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
</div>
{/*  Trail Content  */}
<div className="flex-1 overflow-y-auto pr-2 space-y-6">
{access.reasoningTrail?.map((log, i) => (
  <div key={i} className="relative pl-8 animate-in fade-in slide-in-from-right-4 duration-500">
    {i !== access.reasoningTrail.length - 1 && <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-line"></div>}
    
    {log.type === 'agent' ? (
      <div className="absolute left-[-4px] top-0 agent-frame w-8 h-8 bg-secondary flex items-center justify-center z-10">
        <span className="material-symbols-outlined text-[16px] text-white">{log.icon}</span>
      </div>
    ) : (
      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${log.type === 'conclusion' ? 'bg-primary-container text-on-primary-container border border-primary shadow-sm' : 'bg-surface-container border border-line'}`}>
        <span className={`material-symbols-outlined text-[14px] ${log.type === 'conclusion' ? '' : 'text-ink-muted'}`}>{log.icon}</span>
      </div>
    )}

    <div className={`rounded p-3 ${log.type === 'agent' ? 'bg-secondary-container bg-opacity-10 border border-secondary border-opacity-30' : log.type === 'conclusion' ? 'bg-canvas border-2 border-primary-container shadow-sm' : 'bg-canvas border border-line'}`}>
      <p className={`font-label-caps text-label-caps mb-1 ${log.type === 'agent' ? 'text-secondary' : log.type === 'conclusion' ? 'text-primary' : 'text-on-surface-variant'}`}>
        {log.type === 'agent' || log.type === 'conclusion' ? (log.submessage || new Date(log.time).toLocaleTimeString()) : new Date(log.time).toLocaleTimeString()}
      </p>
      <p className={`font-data-md text-data-md text-on-surface ${log.type === 'conclusion' ? 'font-medium' : ''}`}>{log.message}</p>
      {log.type === 'group' && log.submessage && (
        <div className="mt-2 pt-2 border-t border-line border-dashed text-body-sm text-ink-muted font-body-sm">
          {log.submessage}
        </div>
      )}
    </div>
  </div>
))}
</div>
</div>
</div>
</div>
</main>
{/*  Footer (Hidden if not needed, but good for completeness in the shell)  */}
{/*  Suppressed Footer for focused canvas as per guidelines, focusing on map canvas  */}


    </>
  );
}
