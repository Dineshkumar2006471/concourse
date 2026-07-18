'use client';

import { useAgentData } from '@/hooks/useAgentData';

export default function Page() {
  const { polyglot, pulse } = useAgentData();
  return (
    <>

{/*  SideNavBar (Permanent)  */}

{/*  Canvas  */}
<main className="flex-1 lg:ml-[240px] flex overflow-hidden bg-canvas" role="main" aria-label="Polyglot Translation Interface">
{/*  Left Panel: Multilingual Chat Interface  */}
<div className="flex-1 flex flex-col border-r border-line relative">
{/*  Chat Header  */}
<div className="p-4 border-b border-line bg-canvas-alt flex justify-between items-center z-10">
<div>
<h3 className="font-headline-md text-headline-md flex items-center gap-2">
                            Polyglot
                            <span className="bg-floodlight-tint text-primary px-2 py-0.5 rounded-full font-label-caps text-label-caps border border-secondary/20 flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                                ACTIVE
                            </span>
</h3>
<p className="font-body-sm text-body-sm text-ink-muted mt-1">Real-time communications monitoring &amp; translation</p>
</div>
<div className="flex gap-2">
<div className="px-3 py-1 border border-line rounded bg-canvas font-data-md text-data-md flex flex-col items-end">
<span className="text-ink-muted text-[10px]">ACTIVE NODES</span>
<span className="font-semibold text-primary">{polyglot.activeNodes || pulse?.flowRate || 124}</span>
</div>
</div>
</div>
{/*  Chat Canvas (Scrollable)  */}
<div className="flex-1 overflow-y-auto p-6 space-y-6 bg-canvas relative z-0">
{polyglot.liveTranslations?.map((chat, idx) => (
  <div key={idx} className={`flex flex-col gap-1 max-w-[85%] animate-in fade-in slide-in-from-bottom-4 duration-500 ${chat.align === 'right' ? 'ml-auto items-end' : ''}`}>
    <div className="flex items-center gap-2 text-ink-muted font-body-sm text-[11px] mb-1">
      {chat.align === 'left' ? (
        <>
          <span className="font-semibold text-on-surface">{chat.sender}</span>
          <span>•</span>
          <span>{new Date(chat.time).toLocaleTimeString()}</span>
          <span className="bg-surface-container px-1.5 py-0.5 rounded border border-line">{chat.lang}</span>
        </>
      ) : (
        <>
          <span className="bg-surface-container px-1.5 py-0.5 rounded border border-line">{chat.lang}</span>
          <span>•</span>
          <span>{new Date(chat.time).toLocaleTimeString()}</span>
          <span className="font-semibold text-primary flex items-center gap-1">
            {chat.isAgent && <span className="material-symbols-outlined text-[14px]">smart_toy</span>}
            {chat.sender}
          </span>
        </>
      )}
    </div>
    <div className={`p-3 rounded-lg relative ${chat.align === 'right' ? 'rounded-tr-none border border-primary/30 bg-floodlight-tint' : 'rounded-tl-none border border-line bg-canvas-alt'}`}>
      <p className={`mb-2 ${chat.align === 'right' ? 'font-headline-md text-body-md font-medium text-on-surface' : 'font-body-md text-body-md text-on-surface-variant italic'}`}>{chat.source}</p>
      <div className={`w-full h-px mb-2 ${chat.align === 'right' ? 'bg-primary/20' : 'bg-line'}`}></div>
      <p className={`${chat.align === 'right' ? 'font-body-md text-body-md text-on-surface-variant italic' : 'font-headline-md text-body-md font-medium text-on-surface'}`}>{chat.translated}</p>
      {chat.align === 'left' && (
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-6 border-t border-dashed border-line"></div>
          <div className="w-8 h-8 rounded-full border border-primary bg-canvas flex items-center justify-center text-primary font-data-md text-[10px] shadow-sm">
            {chat.conf}%
          </div>
        </div>
      )}
    </div>
  </div>
))}
</div>
{/*  Input Area  */}
<div className="p-4 border-t border-line bg-canvas">
<div className="relative flex items-center">
<div className="absolute left-3 flex gap-2">
<button className="text-ink-muted hover:text-primary transition-colors" aria-label="Toggle Microphone"><span className="material-symbols-outlined text-[20px]" aria-hidden="true">mic</span></button>
<button className="text-ink-muted hover:text-primary transition-colors" aria-label="Toggle Auto-Translate"><span className="material-symbols-outlined text-[20px]" aria-hidden="true">translate</span></button>
</div>
<input className="w-full pl-16 pr-12 py-3 border border-line rounded-lg bg-canvas-alt font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all" placeholder="Type message to broadcast (auto-translated to relevant sectors)..." type="text"/>
<button className="absolute right-3 bg-primary text-on-primary w-8 h-8 rounded flex items-center justify-center hover:bg-pitch-hover transition-colors" aria-label="Send Message">
<span className="material-symbols-outlined text-[18px]">send</span>
</button>
</div>
</div>
</div>
{/*  Right Sidebar: Stats & Reasoning  */}
<div className="w-[320px] bg-canvas-alt flex flex-col h-full overflow-y-auto border-l border-line shadow-[-4px_0_12px_rgba(0,0,0,0.02)] z-10">
{/*  Section 1: Coverage Stats  */}
<div className="p-5 border-b border-line bg-canvas">
<h4 className="font-label-caps text-label-caps text-ink-muted mb-4 uppercase tracking-wider">Live Language Coverage</h4>
<div className="space-y-4">
{/*  Stat Item  */}
<div>
<div className="flex justify-between items-end mb-1">
<span className="font-headline-md text-body-sm font-medium">English (Primary)</span>
<span className="font-data-md text-data-md text-primary">100%</span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary w-full"></div>
</div>
</div>
{/*  Stat Item  */}
<div>
<div className="flex justify-between items-end mb-1">
<span className="font-headline-md text-body-sm font-medium">Spanish (LatAm)</span>
<span className="font-data-md text-data-md text-secondary">84%</span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[84%]"></div>
</div>
</div>
{/*  Stat Item  */}
<div>
<div className="flex justify-between items-end mb-1">
<span className="font-headline-md text-body-sm font-medium">French</span>
<span className="font-data-md text-data-md text-ink-muted">42%</span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-outline w-[42%]"></div>
</div>
</div>
</div>
</div>
{/*  Section 2: Reasoning Trail  */}
<div className="p-5 flex-1 bg-canvas-alt">
<h4 className="font-label-caps text-label-caps text-ink-muted mb-4 uppercase tracking-wider flex items-center justify-between">
                        Dialect Logic
                        <span className="material-symbols-outlined text-[16px]">psychology</span>
</h4>
<div className="reasoning-trail space-y-4 pl-1">
{/*  Trail Item 1  */}
<div className="relative flex gap-3">
<div className="w-5 h-5 rounded-full bg-canvas border border-line flex-shrink-0 z-10 flex items-center justify-center mt-0.5">
<span className="w-2 h-2 rounded-full bg-primary"></span>
</div>
<div>
<p className="font-data-md text-[12px] text-ink-muted mb-1">14:02:11 | NODE_992</p>
<div className="bg-canvas border border-line rounded p-2 text-body-sm">
<span className="font-semibold block mb-1">Audio Source: Gate C</span>
<span className="font-data-md text-[11px] text-on-surface-variant">Detected acoustic pattern matches Argentine Spanish dialect based on phonological markers.</span>
</div>
</div>
</div>
{/*  Trail Item 2  */}
<div className="relative flex gap-3">
<div className="w-5 h-5 rounded-full bg-canvas border border-line flex-shrink-0 z-10 flex items-center justify-center mt-0.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
</div>
<div>
<p className="font-data-md text-[12px] text-ink-muted mb-1">14:02:12 | LOGIC_CORE</p>
<div className="bg-canvas border border-line rounded p-2 text-body-sm">
<span className="font-semibold block mb-1">Contextual Override</span>
<span className="font-data-md text-[11px] text-on-surface-variant">Applying stadium security glossary. &apos;Multitud&apos; translated as &apos;crowd&apos; (high density context), not &apos;audience&apos;.</span>
</div>
</div>
</div>
{/*  Trail Item 3  */}
<div className="relative flex gap-3">
<div className="w-5 h-5 rounded-full bg-canvas border border-line flex-shrink-0 z-10 flex items-center justify-center mt-0.5">
<span className="material-symbols-outlined text-[12px] text-primary">check</span>
</div>
<div>
<p className="font-data-md text-[12px] text-ink-muted mb-1">14:02:13 | DISPATCH</p>
<div className="bg-canvas border border-line rounded p-2 text-body-sm bg-floodlight-tint border-primary/20">
<span className="font-semibold text-primary block mb-1">Translation Finalized</span>
<span className="font-data-md text-[11px] text-primary">Confidence: 98%. Broadcasted to Command English channel.</span>
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
