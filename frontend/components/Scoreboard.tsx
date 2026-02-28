'use client'

import { getMockCurves } from '@/lib/mockData'

function fmt(v: number) {
    return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

export default function Scoreboard({ ticker }: { ticker: string }) {
    const { aiCurve, spyCurve, stockCurve } = getMockCurves(ticker);

    const scoreboardData = [
        {
            label: 'AI Strategy',
            color: '#818cf8',
            value: aiCurve[aiCurve.length - 1]?.value ?? 10000,
            initial: 10000,
            icon: '🤖',
        },
        {
            label: 'SPY (Benchmark)',
            color: '#94a3b8',
            value: spyCurve[spyCurve.length - 1]?.value ?? 10000,
            initial: 10000,
            icon: '📈',
        },
        {
            label: `${ticker} Buy & Hold`,
            color: '#34d399',
            value: stockCurve[stockCurve.length - 1]?.value ?? 10000,
            initial: 10000,
            icon: '💎',
        },
    ]

    const winner = [...scoreboardData].sort((a, b) => b.value - a.value)[0]

    return (
        <div className="grid grid-cols-3 gap-3">
            {scoreboardData.map(s => {
                const pct = ((s.value - s.initial) / s.initial * 100)
                const up = pct >= 0
                const isWinner = s.label === winner.label

                return (
                    <div
                        key={s.label}
                        className={`relative bg-[#12121a] border rounded-xl p-4 flex flex-col gap-1 transition-all ${isWinner
                            ? 'border-indigo-500/50 shadow-[0_0_18px_rgba(129,140,248,0.2)]'
                            : 'border-[#1e1e2e] opacity-80'
                            }`}
                    >
                        {isWinner && (
                            <span className="absolute -top-2.5 right-3 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-semibold">
                                🏆 WINNING
                            </span>
                        )}
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                            <span className="text-[11px] text-slate-400 truncate">{s.label}</span>
                        </div>
                        <p className="text-xl font-bold font-mono" style={{ color: s.color }}>{fmt(s.value)}</p>
                        <p className={`text-sm font-mono font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>
                            {up ? '+' : ''}{pct.toFixed(2)}%
                        </p>
                        <p className="text-[10px] text-slate-600 font-mono">from {fmt(s.initial)}</p>
                    </div>
                )
            })}
        </div>
    )
}
