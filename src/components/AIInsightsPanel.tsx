import React from 'react';

export interface AIInsightLog {
  type: string;
  message: string;
  submessage?: string;
  icon: string;
  color: string;
  bg: string;
  time?: string;
  title?: string;
}

export interface AIInsightsPanelProps {
  logs: AIInsightLog[];
  title?: string;
  kpiPrimary?: { label: string; value: string };
  kpiSecondary?: { label: string; value: string };
}

export function AIInsightsPanel({ 
  logs, 
  title = "Gen AI Operational Insights",
  kpiPrimary,
  kpiSecondary
}: AIInsightsPanelProps) {
  if (!logs || logs.length === 0) {
    return null;
  }

  return (
    <div className="bg-canvas border border-line rounded-xl p-6 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">auto_awesome</span>
          {title}
        </h3>
        <span className="px-2 py-1 rounded bg-surface-container-high text-ink-muted font-label-caps text-[10px] border border-line">
          LIVE MODEL INFERENCE
        </span>
      </div>

      {(kpiPrimary || kpiSecondary) && (
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-line">
          {kpiPrimary && (
            <div>
              <span className="block font-label-caps text-[10px] text-ink-muted mb-1 uppercase">
                {kpiPrimary.label}
              </span>
              <span className="font-data-md text-data-lg font-semibold text-primary">
                {kpiPrimary.value}
              </span>
            </div>
          )}
          {kpiSecondary && (
            <div>
              <span className="block font-label-caps text-[10px] text-ink-muted mb-1 uppercase">
                {kpiSecondary.label}
              </span>
              <span className="font-data-md text-data-lg font-semibold text-secondary">
                {kpiSecondary.value}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-4 items-start animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-0.5 ${log.bg}`}>
              <span className={`material-symbols-outlined text-sm ${log.color}`}>{log.icon}</span>
            </div>
            <div>
              {log.title && (
                <span className="font-label-caps text-label-caps text-on-surface block mb-0.5">{log.title}</span>
              )}
              <p className="font-body-sm text-body-md text-on-surface">
                {log.message}
              </p>
              {(log.submessage || log.time) && (
                <div className="flex items-center gap-2 mt-1 font-body-sm text-xs text-ink-muted">
                  {log.time && <span>{new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>}
                  {log.time && log.submessage && <span>•</span>}
                  {log.submessage && <span>{log.submessage}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
