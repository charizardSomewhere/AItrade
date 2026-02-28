'use client'

import { MOCK_AI_LOGS } from '@/lib/mockData'

const SIGNAL_CONFIG = {
    BUY: { cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    SELL: { cls: 'bg-red-500/15 text-red-400 border-red-500/30' },
    HOLD: { cls: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
}

export default function AILogPanel() {
    return (
        <div className="flex flex-col gap-2 h-full flex-1 min-h-0">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-500">🧠 AI Request / Response</h3>
                <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-live" />
                    LIVE
                </span>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1 pb-4">
                {MOCK_AI_LOGS.map(log => {
                    const s = SIGNAL_CONFIG[log.signal as keyof typeof SIGNAL_CONFIG]
                    return (
                        <div key={log.id} className={`border rounded-lg p-3 flex flex-col gap-2 ${s.cls}`}>
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${s.cls}`}>
                                    {log.signal}
                                </span>
                                <span className="text-[10px] text-slate-600 font-mono">{log.time}</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Request</p>
                                <p className="text-[11px] text-slate-400 font-mono leading-relaxed">{log.request}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Response</p>
                                <p className="text-[11px] text-slate-300 font-mono leading-relaxed">{log.response}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
