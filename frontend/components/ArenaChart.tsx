'use client'

import { useState } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts'
import { getMockCurves, MOCK_TICKER } from '@/lib/mockData'

// Global lines removed because they depend on dynamic ticker


const FILTERS = ['1W', '1M', '3M', '1Y', 'ALL']

function fmt(v: number) {
    return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{ name: string; value: number; color: string }>
    label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null
    return (
        <div className="custom-tooltip text-xs">
            <p className="text-slate-400 mb-1">{label}</p>
            {payload.map(p => (
                <p key={p.name} style={{ color: p.color }} className="flex justify-between gap-4">
                    <span>{p.name}</span><span className="font-mono">{fmt(p.value)}</span>
                </p>
            ))}
        </div>
    )
}

export default function ArenaChart({ ticker }: { ticker: string }) {
    const [timeframe, setTimeframe] = useState('ALL')
    const LINES = [
        { key: 'ai', label: 'AI Strategy', color: '#818cf8' },
        { key: 'spy', label: 'SPY Benchmark', color: '#94a3b8' },
        { key: 'stock', label: `${ticker} B&H`, color: '#34d399' },
    ]

    const { aiCurve, spyCurve, stockCurve } = getMockCurves(ticker);

    let mergedData = aiCurve.map((d, i) => ({
        date: d.date,
        ai: d.value,
        spy: spyCurve[i]?.value,
        stock: stockCurve[i]?.value,
    }))

    if (timeframe === '1W') mergedData = mergedData.slice(-5)
    else if (timeframe === '1M') mergedData = mergedData.slice(-21)
    else if (timeframe === '3M') mergedData = mergedData.slice(-63)
    else if (timeframe === '1Y') mergedData = mergedData.slice(-252)

    return (
        <div className="flex flex-col gap-3">
            {/* Title + Filter row */}
            <div className="flex items-center justify-between px-2">
                <div>
                    <p className="text-[10px] text-slate-500 tracking-widest uppercase">Total Account Value</p>
                    <p className="text-lg font-semibold text-slate-100">Trend Period: {timeframe}</p>
                </div>
                <div className="flex gap-1">
                    {FILTERS.map((f, i) => (
                        <button
                            key={f}
                            onClick={() => setTimeframe(f)}
                            className={`px-3 py-1 text-xs rounded font-mono transition-colors ${f === timeframe
                                ? 'bg-indigo-600 text-white'
                                : 'bg-[#1e1e2e] text-slate-400 hover:bg-[#2a2a3e] hover:text-slate-200'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={340}>
                <LineChart data={mergedData} margin={{ top: 8, right: 80, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#475569', fontSize: 10 }}
                        tickLine={false}
                        axisLine={{ stroke: '#1e1e2e' }}
                        tickFormatter={v => {
                            const d = new Date(v)
                            return `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear().toString().slice(2)}`
                        }}
                        interval={Math.max(1, Math.floor(mergedData.length / 6))}
                    />
                    <YAxis
                        tick={{ fill: '#475569', fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
                        width={45}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    {LINES.map(l => (
                        <Line
                            key={l.key}
                            type="monotone"
                            dataKey={l.key}
                            name={l.label}
                            stroke={l.color}
                            strokeWidth={1.8}
                            dot={false}
                            activeDot={{ r: 4, fill: l.color }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>

            {/* End-of-line badges legend */}
            <div className="flex gap-3 px-2 flex-wrap">
                {LINES.map(l => {
                    const first = mergedData[0]
                    const last = mergedData[mergedData.length - 1]
                    const startVal = first?.[l.key as keyof typeof first] as number || 10000
                    const val = last?.[l.key as keyof typeof last] as number || 10000
                    const pct = ((val - startVal) / startVal * 100).toFixed(1)
                    const up = val >= startVal
                    return (
                        <div key={l.key} className="flex items-center gap-2 bg-[#12121a] border border-[#1e1e2e] rounded-lg px-3 py-1.5">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                            <span className="text-xs text-slate-400">{l.label}</span>
                            <span className="text-xs font-mono font-semibold" style={{ color: l.color }}>{fmt(val)}</span>
                            <span className={`text-xs font-mono ${up ? 'text-emerald-400' : 'text-red-400'}`}>
                                {up ? '+' : ''}{pct}%
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
