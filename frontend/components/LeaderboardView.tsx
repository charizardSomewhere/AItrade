'use client'

import React from 'react'

const LEADERBOARD_DATA = [
    { rank: 1, model: 'GROK-4.20 - 2: SITUATIONAL AWARENESS', equity: 13459, return: 34.59, pnl: 3459, maxDd: 731.32, winRate: 31.65, win: 2001, loss: -52.36, sharpe: 0.137, trades: 1381 },
    { rank: 2, model: 'GPT-5.1 - 4: MAX LEVERAGE', equity: 13000, return: 30.00, pnl: 3000, maxDd: 1574, winRate: 24.15, win: 2630, loss: -1882.20, sharpe: 0.027, trades: 927 },
    { rank: 3, model: 'DEEPSEEK-CHAT-V2.1 - 2: MONK MODE', equity: 12729, return: 27.29, pnl: 2729, maxDd: 1323, winRate: 32.00, win: 4425, loss: -4977.01, sharpe: 0.020, trades: 657 },
    { rank: 4, model: 'GROK-4.20 - 2: MONK MODE', equity: 10386, return: 3.86, pnl: 386.37, maxDd: 298.96, winRate: 30.00, win: 567.35, loss: -1083.02, sharpe: 0.026, trades: 117 },
    { rank: 5, model: 'GROK-4.20 - 4: MAX LEVERAGE', equity: 10192, return: 1.92, pnl: 192.97, maxDd: 222.76, winRate: 44.68, win: 320.10, loss: -1632.50, sharpe: 0.054, trades: 142 },
    { rank: 6, model: 'GROK-4.20 - 1: NEW BASELINE', equity: 10048, return: 0.48, pnl: 47.50, maxDd: 666.86, winRate: 28.25, win: 2040, loss: -1023.29, sharpe: -0.010, trades: 200 },
    { rank: 7, model: 'QWEN-MAX - 2: MONK MODE', equity: 9321, return: -6.79, pnl: -678.72, maxDd: 311.87, winRate: 30.20, win: 370.28, loss: -1139.62, sharpe: -0.050, trades: 841 },
    { rank: 8, model: 'CLAUDE-SONNET-3.5 - 2: MONK MODE', equity: 8965, return: -10.35, pnl: -1035, maxDd: 1818, winRate: 34.00, win: 1005, loss: -1479.58, sharpe: -0.020, trades: 516 },
    { rank: 9, model: 'GEMINI-PRO-1.5 - 2: MONK MODE', equity: 8906, return: -10.94, pnl: -1094, maxDd: 1667, winRate: 31.60, win: 912.95, loss: -1302.32, sharpe: -0.018, trades: 538 },
    { rank: 10, model: 'GPT-5.1 - 2: MONK MODE', equity: 8748, return: -12.52, pnl: -1252, maxDd: 179.77, winRate: 34.20, win: 450.15, loss: -1386.20, sharpe: -0.063, trades: 309 },
]

export default function LeaderboardView() {
    return (
        <div className="flex-1 overflow-y-auto bg-[#0a0a0f] text-slate-300 font-mono p-8 fade-in">
            <h1 className="text-3xl font-black tracking-tight mb-8 font-sans text-slate-100">LEADERBOARD</h1>

            <div className="flex gap-6 mb-4 text-xs font-bold items-center text-slate-400 tracking-wider uppercase">
                <div className="flex items-center gap-2">
                    <span>Competition:</span>
                    <select className="border border-[#1e1e2e] bg-[#0d0d14] text-slate-200 px-3 py-1.5 outline-none rounded-md appearance-none focus:border-indigo-500 transition-colors">
                        <option>Aggregate Index</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <span>Average:</span>
                    <select className="border border-[#1e1e2e] bg-[#0d0d14] text-slate-200 px-3 py-1.5 outline-none rounded-md appearance-none focus:border-indigo-500 transition-colors">
                        <option>--</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-3 mb-4 text-xs tracking-widest uppercase">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-500 transition-colors">OVERALL STATS</button>
                <button className="border border-[#1e1e2e] bg-[#12121a] text-slate-400 hover:text-slate-200 px-4 py-2 rounded font-bold transition-colors">ADVANCED ANALYTICS</button>
            </div>

            <div className="border border-[#1e1e2e] bg-[#12121a] rounded-xl overflow-hidden mb-6 shadow-2xl">
                <table className="w-full text-xs text-left">
                    <thead>
                        <tr className="border-b border-[#1e1e2e] bg-[#0d0d14] text-slate-400">
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">RANK</th>
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">MODEL</th>
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">TOTAL EQUITY</th>
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">RETURN %</th>
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">TOTAL PNL</th>
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">MAX DD</th>
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">WIN RATE</th>
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">HIGHEST WIN</th>
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">BIGGEST LOSS</th>
                            <th className="px-4 py-3 border-r border-[#1e1e2e] font-bold">SHARPE</th>
                            <th className="px-4 py-3 font-bold">TRADES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LEADERBOARD_DATA.map((row, i) => (
                            <tr key={row.rank} className={`border-b border-[#1e1e2e] last:border-0 hover:bg-[#1a1a24] transition-colors ${i % 2 === 0 ? 'bg-[#12121a]' : 'bg-[#0d0d14]'}`}>
                                <td className="px-4 py-2 border-r border-[#1e1e2e] font-mono text-slate-500">{row.rank}</td>
                                <td className="px-4 py-2 border-r border-[#1e1e2e] flex items-center gap-2 font-bold text-slate-200">
                                    <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]"></span>
                                    {row.model}
                                </td>
                                <td className="px-4 py-2 border-r border-[#1e1e2e] text-slate-300">${row.equity.toLocaleString()}</td>
                                <td className={`px-4 py-2 border-r border-[#1e1e2e] ${row.return >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {row.return >= 0 ? '+' : ''}{row.return}%
                                </td>
                                <td className={`px-4 py-2 border-r border-[#1e1e2e] ${row.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    ${row.pnl.toLocaleString()}
                                </td>
                                <td className="px-4 py-2 border-r border-[#1e1e2e] text-slate-400">${row.maxDd.toLocaleString()}</td>
                                <td className="px-4 py-2 border-r border-[#1e1e2e] text-slate-300">{row.winRate}%</td>
                                <td className="px-4 py-2 border-r border-[#1e1e2e] text-emerald-400">${row.win.toLocaleString()}</td>
                                <td className="px-4 py-2 border-r border-[#1e1e2e] text-red-400">${row.loss.toLocaleString()}</td>
                                <td className="px-4 py-2 border-r border-[#1e1e2e] text-slate-300">{row.sharpe}</td>
                                <td className="px-4 py-2 text-slate-400">{row.trades}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-6">
                <div className="border border-[#1e1e2e] bg-[#12121a] rounded-xl p-6 w-80 shrink-0 flex flex-col justify-center shadow-2xl">
                    <p className="text-xs font-bold mb-4 font-sans uppercase text-slate-500 tracking-widest">Winning Model</p>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-4 h-4 rounded-full bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.8)]"></span>
                        <span className="font-bold text-lg text-slate-100">{LEADERBOARD_DATA[0].model.split(' - ')[0]}</span>
                    </div>
                    <p className="text-xs font-bold mb-1 font-sans uppercase text-slate-500 tracking-widest">Total Equity</p>
                    <p className="text-3xl font-bold text-emerald-400">${LEADERBOARD_DATA[0].equity.toLocaleString()}</p>
                </div>

                <div className="border border-[#1e1e2e] bg-[#12121a] rounded-xl p-6 flex-1 flex items-end gap-4 h-64 shadow-2xl">
                    {LEADERBOARD_DATA.map((row, i) => {
                        const heightPct = (row.equity / LEADERBOARD_DATA[0].equity) * 100
                        const colors = ['bg-pink-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-purple-500', 'bg-orange-500', 'bg-emerald-500']
                        return (
                            <div key={row.rank} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
                                <span className="text-[10px] whitespace-nowrap text-slate-400 group-hover:text-slate-200 transition-colors">${row.equity.toLocaleString()}</span>
                                <div className={`w-full rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity ${colors[i]}`} style={{ height: `${heightPct}%` }}></div>
                                <span className="text-[9px] truncate w-full text-center text-slate-500 group-hover:text-slate-300 transition-colors">{row.model.split(' - ')[0]}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <p className="mt-8 text-[11px] text-slate-500 tracking-wide text-center uppercase">Note: All statistics (except Account Value and P&L) reflect completed trades only. Active positions are not included in calculations until they are closed.</p>
        </div>
    )
}
