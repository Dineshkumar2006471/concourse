'use client';

import React from 'react';
import { Bot, Send, Settings2, Sparkles } from 'lucide-react';

interface AgentScreenLayoutProps {
  children: React.ReactNode;
  isFullWidth?: boolean;
  agentName: string;
  chips?: React.ReactNode;
}

export function AgentScreenLayout({ children, isFullWidth = false, agentName, chips }: AgentScreenLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)]">
      {/* Primary Interactive Surface */}
      <div className={`flex flex-col ${isFullWidth ? 'w-full' : 'w-full md:w-[60%]'} bg-canvas rounded-2xl border border-line shadow-sm overflow-hidden relative`}>
        {/* Chips Header */}
        {chips && (
          <div className="absolute top-4 left-4 right-4 z-10 flex gap-2 overflow-x-auto">
            {chips}
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-canvas-alt/30">
          {children}
        </div>
      </div>

      {/* Conversational Panel (hidden if full width) */}
      {!isFullWidth && (
        <div className="w-full md:w-[40%] bg-canvas rounded-2xl border border-line shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="h-14 border-b border-line flex items-center justify-between px-4 bg-canvas-alt/50">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-pitch" />
              <span className="font-semibold text-ink">{agentName}</span>
            </div>
            <button className="text-ink-muted hover:text-ink">
              <Settings2 className="w-4 h-4" />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Example Chat Message */}
            <div className="flex flex-col gap-1 max-w-[85%]">
              <div className="bg-canvas-alt text-ink p-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed border border-line/50">
                Hi, I'm the {agentName} agent. How can I help you navigate the stadium today?
              </div>
              <span className="text-[10px] text-ink-muted ml-1">10:42 AM</span>
            </div>
          </div>

          {/* Reasoning Trail (Collapsed placeholder) */}
          <div className="mx-4 mb-2 p-2 bg-canvas-alt border border-line rounded-lg flex items-center justify-between cursor-pointer hover:bg-line/30 transition-colors">
             <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
               <Sparkles className="w-3 h-3 text-pitch" />
               Agent Reasoning Active
             </div>
             <span className="text-[10px] bg-canvas border border-line px-1.5 py-0.5 rounded text-ink-muted">View</span>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-line bg-canvas">
            <div className="relative">
              <input 
                type="text" 
                placeholder={`Ask ${agentName}...`}
                className="w-full bg-canvas-alt border border-line rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-pitch focus:ring-1 focus:ring-pitch transition-all placeholder:text-ink-muted"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-pitch hover:bg-pitch-hover text-white rounded-lg flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
