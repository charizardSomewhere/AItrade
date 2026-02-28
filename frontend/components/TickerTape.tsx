'use client'

import { MOCK_TICKERS } from '@/lib/mockData'

export default function TickerTape() {
    // Duplicate for seamless looping
    const items = [...MOCK_TICKERS, ...MOCK_TICKERS]

    return (
        <div className="border-b border-[#1e1e2e] bg-[#0d0d14] overflow-hidden">
            <div className="ticker-track py-2">
                {items.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-6 text-xs font-mono whitespace-nowrap">
                        <span className="text-slate-400 font-semibold tracking-widest">{t.symbol}</span>
                        <span className="text-slate-200">${t.price.toFixed(2)}</span>
                        <span className={t.change >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {t.change >= 0 ? '+' : ''}{t.change.toFixed(2)}%
                        </span>
                        <span className="text-[#1e1e2e] select-none">│</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
