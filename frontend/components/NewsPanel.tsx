'use client'

import { MOCK_NEWS } from '@/lib/mockData'

const SENTIMENT_CONFIG = {
    positive: { label: 'POS', cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
    negative: { label: 'NEG', cls: 'bg-red-500/10 text-red-400 border border-red-500/20' },
    neutral: { label: ' ~ ', cls: 'bg-slate-500/10 text-slate-400 border border-slate-500/20' },
}

const IMPACT_CONFIG = {
    HIGH: 'text-orange-400',
    MEDIUM: 'text-yellow-400',
    LOW: 'text-slate-500',
}

export default function NewsPanel() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-500">📰 News Sentiment</h3>
                <span className="text-[10px] text-slate-600">Updated 14 min ago</span>
            </div>
            <div className="flex flex-col gap-2">
                {MOCK_NEWS.map(item => {
                    const s = SENTIMENT_CONFIG[item.sentiment]
                    const ic = IMPACT_CONFIG[item.impact as keyof typeof IMPACT_CONFIG]
                    return (
                        <div key={item.id} className="group flex gap-3 bg-[#0d0d14] hover:bg-[#12121a] border border-[#1e1e2e] rounded-lg p-3 transition-colors cursor-pointer">
                            <div className="flex flex-col items-center gap-1 pt-0.5 flex-shrink-0">
                                <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${s.cls}`}>{s.label}</span>
                                <span className={`text-[9px] font-mono ${ic}`}>{item.impact}</span>
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-0">
                                <p className="text-xs text-slate-300 leading-snug line-clamp-2">{item.headline}</p>
                                <div className="flex gap-2 text-[10px] text-slate-600">
                                    <span>{item.source}</span><span>·</span><span>{item.time}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
