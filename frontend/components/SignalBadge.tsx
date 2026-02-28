'use client'

import { getMockSignal } from '@/lib/mockData'

const CONFIG = {
    BUY: { label: 'BUY', gradient: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/40', text: 'text-emerald-400', glow: 'glow-green' },
    SELL: { label: 'SELL', gradient: 'from-red-500/20 to-red-500/5', border: 'border-red-500/40', text: 'text-red-400', glow: 'glow-red' },
    HOLD: { label: 'HOLD', gradient: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/40', text: 'text-yellow-400', glow: '' },
} as const

export default function SignalBadge({ ticker }: { ticker: string }) {
    const signal = getMockSignal(ticker)
    const c = CONFIG[signal.action]
    return (
        <div className={`bg-gradient-to-br ${c.gradient} border ${c.border} ${c.glow} rounded-xl p-4 flex flex-col gap-3`}>
            {/* Ticker + price */}
            <div className="flex items-baseline justify-between">
                <div>
                    <span className="text-xs text-slate-500 tracking-widest uppercase">Analyzing</span>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-100">{ticker}</h2>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-400 font-mono">${signal.price.toFixed(2)}</p>
                    <p className="text-[10px] text-slate-600">Last price</p>
                </div>
            </div>

            {/* Signal */}
            <div className="flex items-center gap-3">
                <span className={`text-4xl font-black tracking-tighter ${c.text}`}>{c.label}</span>
                <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Confidence</span>
                    <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${c.text} bg-current transition-all`}
                                style={{ width: `${signal.confidence}%`, opacity: 0.8 }}
                            />
                        </div>
                        <span className={`text-sm font-mono font-bold ${c.text}`}>{signal.confidence}%</span>
                    </div>
                </div>
            </div>

            {/* Sentiment row */}
            <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-[#0d0d14]/60 rounded-lg p-2">
                    <p className="text-[10px] text-slate-500 mb-0.5">Sentiment</p>
                    <p className="text-xs font-semibold text-emerald-400">{signal.sentimentLabel}</p>
                </div>
                <div className="bg-[#0d0d14]/60 rounded-lg p-2">
                    <p className="text-[10px] text-slate-500 mb-0.5">Score</p>
                    <p className="text-xs font-mono font-semibold text-slate-200">{signal.sentimentScore > 0 ? '+' : ''}{signal.sentimentScore}</p>
                </div>
            </div>

            {/* Scheduler note */}
            <div className="flex items-center justify-between text-[10px] text-slate-600 border-t border-[#1e1e2e] pt-2">
                <span>⏱ Updates every 15 min via Alpha Vantage</span>
                <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-live" />
                    LIVE
                </span>
            </div>
        </div>
    )
}
