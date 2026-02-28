'use client'

import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { MOCK_TICKERS } from '@/lib/mockData'

export default function TickerSearch({
    activeTicker,
    onSelect
}: {
    activeTicker: string,
    onSelect: (ticker: string) => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const filteredTickers = MOCK_TICKERS.filter(t =>
        t.symbol.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="relative" ref={containerRef}>
            {/* Search Bar / Active Display */}
            <div
                className={`flex items-center gap-2 bg-[#12121a] border rounded-lg px-3 py-1.5 cursor-text transition-all ${isOpen ? 'border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.2)]' : 'border-[#1e1e2e] hover:border-[#2a2a3e]'
                    }`}
                onClick={() => setIsOpen(true)}
            >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                {isOpen ? (
                    <input
                        type="text"
                        className="bg-transparent border-none outline-none text-sm font-bold font-mono text-indigo-300 w-20 p-0 placeholder-slate-600"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <>
                        <span className="text-sm font-bold font-mono text-indigo-300 w-20">{activeTicker}</span>
                        <span className="text-[10px] text-slate-600">▼</span>
                    </>
                )}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#12121a] border border-[#1e1e2e] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-64 overflow-y-auto py-1">
                        {filteredTickers.length > 0 ? (
                            filteredTickers.map(t => (
                                <button
                                    key={t.symbol}
                                    className="w-full text-left px-4 py-2 hover:bg-[#1e1e2e] flex items-center justify-between transition-colors"
                                    onClick={() => {
                                        onSelect(t.symbol)
                                        setIsOpen(false)
                                        setQuery('')
                                    }}
                                >
                                    <span className="font-mono font-bold text-slate-200">{t.symbol}</span>
                                    <span className="text-xs text-slate-500">${t.price.toFixed(2)}</span>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-xs text-slate-500 text-center">
                                No tickers found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
