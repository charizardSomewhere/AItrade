'use client'

import { MOCK_OPTIONS } from '@/lib/mockData'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts'

const barData = [
    { name: 'Calls', value: MOCK_OPTIONS.callVolume, fill: '#34d399' },
    { name: 'Puts', value: MOCK_OPTIONS.putVolume, fill: '#f87171' },
]

function fmt(v: number) {
    return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v)
}

export default function OptionsPanel() {
    const bullish = MOCK_OPTIONS.ratio > 1
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-500">🎯 Options Flow</h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${bullish ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {bullish ? '🟢 Bullish' : '🔴 Bearish'}
                </span>
            </div>

            {/* P/C Ratio */}
            <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-lg p-2">
                    <p className="text-[10px] text-slate-500 mb-0.5">Calls</p>
                    <p className="text-sm font-mono font-bold text-emerald-400">{fmt(MOCK_OPTIONS.callVolume)}</p>
                </div>
                <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-lg p-2">
                    <p className="text-[10px] text-slate-500 mb-0.5">P/C Ratio</p>
                    <p className="text-sm font-mono font-bold text-slate-200">{(MOCK_OPTIONS.putVolume / MOCK_OPTIONS.callVolume).toFixed(2)}</p>
                </div>
                <div className="bg-[#0d0d14] border border-[#1e1e2e] rounded-lg p-2">
                    <p className="text-[10px] text-slate-500 mb-0.5">Puts</p>
                    <p className="text-sm font-mono font-bold text-red-400">{fmt(MOCK_OPTIONS.putVolume)}</p>
                </div>
            </div>

            {/* Volume Bar */}
            <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#475569', fontSize: 10 }} tickFormatter={fmt} tickLine={false} axisLine={false} />
                        <Tooltip
                            formatter={(v: number) => [fmt(v), 'Volume']}
                            contentStyle={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: 8, fontSize: 11 }}
                            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {barData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Unusual Activity */}
            <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Unusual Activity</p>
                <div className="flex flex-col gap-1">
                    {MOCK_OPTIONS.unusualActivity.map((a, i) => (
                        <div key={i} className="flex items-center justify-between bg-[#0d0d14] border border-[#1e1e2e] rounded-lg px-3 py-2 text-xs font-mono">
                            <span className={a.type === 'CALL' ? 'text-emerald-400' : 'text-red-400'}>{a.strike}</span>
                            <span className="text-slate-600">{a.expiry}</span>
                            <span className="text-slate-300">Vol: {a.volume}</span>
                            <span className="text-slate-500">OI: {a.oi}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
