'use client'

import TickerTape from '@/components/TickerTape'
import ArenaChart from '@/components/ArenaChart'
import Scoreboard from '@/components/Scoreboard'
import NewsPanel from '@/components/NewsPanel'
import OptionsPanel from '@/components/OptionsPanel'
import AILogPanel from '@/components/AILogPanel'
import SignalBadge from '@/components/SignalBadge'
import TickerSearch from '@/components/TickerSearch'
import SettingsModal from '@/components/SettingsModal'
import LeaderboardView from '@/components/LeaderboardView'
import { MOCK_TICKER } from '@/lib/mockData'
import { useState } from 'react'

const NAV_ITEMS = ['LIVE', 'LEADERBOARD', 'MODELS', 'SETTINGS']
const TABS = ['News', 'Options Flow']

export default function HomePage() {
    const [activeNav, setActiveNav] = useState('LIVE')
    const [activeTab, setActiveTab] = useState('News')
    const [currentTicker, setCurrentTicker] = useState(MOCK_TICKER)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [isCompactView, setIsCompactView] = useState(false)
    const [showTickerTape, setShowTickerTape] = useState(true)
    const [isLivePriceJitter, setIsLivePriceJitter] = useState(false)

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-[#0a0a0f]">

            {/* ── Top Nav ─────────────────────────────────────── */}
            {/* Navbar imports and state */}
            <header className="flex items-center justify-between px-6 py-3 border-b border-[#1e1e2e] bg-[#0d0d14] z-10">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">A</div>
                    <div>
                        <span className="text-sm font-bold tracking-tight text-slate-100">AI Stock</span>
                        <span className="text-sm font-bold tracking-tight text-indigo-400"> Arena</span>
                    </div>
                </div>

                {/* Nav links */}
                <nav className="flex gap-6">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item}
                            onClick={() => {
                                if (item === 'SETTINGS') {
                                    setIsSettingsOpen(true)
                                } else {
                                    setActiveNav(item)
                                }
                            }}
                            className={`text-xs font-semibold tracking-widest transition-colors ${activeNav === item ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                {/* Active stock search */}
                <TickerSearch
                    activeTicker={currentTicker}
                    onSelect={(t) => setCurrentTicker(t)}
                />
            </header>

            {/* ── Ticker Tape ─────────────────────────────────── */}
            {showTickerTape && <TickerTape />}

            {/* ── Main Content ────────────────────────────────── */}
            {activeNav === 'LEADERBOARD' ? (
                <LeaderboardView />
            ) : (
                <main className="flex flex-1 overflow-hidden">
                    {/* Left sidebar — Signal + News/Options */}
                    <aside className={`flex-shrink-0 border-r border-[#1e1e2e] flex flex-col transition-all ${isCompactView ? 'w-64 p-3' : 'w-72 p-4'}`}>
                        <div className="flex flex-col gap-4">
                            {/* AI Signal Badge */}
                            <SignalBadge ticker={currentTicker} />

                            {/* Tabs for News / Options */}
                            <div className="flex gap-1 bg-[#0d0d14] rounded-lg p-1">
                                {TABS.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTab(t)}
                                        className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${activeTab === t
                                            ? 'bg-[#1e1e2e] text-slate-200'
                                            : 'text-slate-500 hover:text-slate-300'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            {activeTab === 'News' ? <NewsPanel /> : <OptionsPanel />}
                        </div>
                    </aside>

                    {/* Center — Chart + Scoreboard */}
                    <section className="flex-1 flex flex-col overflow-hidden">
                        <div className={`flex-1 overflow-y-auto flex flex-col ${isCompactView ? 'p-3 gap-3' : 'p-5 gap-5'}`}>
                            {/* Scoreboard */}
                            <Scoreboard ticker={currentTicker} />
                            {/* Arena Chart */}
                            <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-5 fade-in">
                                <ArenaChart ticker={currentTicker} />
                            </div>
                        </div>
                    </section>

                    {/* Right sidebar — AI Interaction Log */}
                    <aside className={`flex-shrink-0 border-l border-[#1e1e2e] flex flex-col transition-all ${isCompactView ? 'w-64 p-3' : 'w-80 p-4'}`}>
                        <AILogPanel />
                    </aside>
                </main>
            )}

            {/* ── Footer ──────────────────────────────────────── */}
            <footer className="border-t border-[#1e1e2e] bg-[#0d0d14] px-6 py-2 flex items-center justify-between text-[10px] text-slate-600">
                <span>AI Stock Arena — Mock UI v0.1 · Data is simulated</span>
                <span>⏱ Next update in 14:32 · Via Alpha Vantage</span>
            </footer>

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                isCompactView={isCompactView}
                setIsCompactView={setIsCompactView}
                showTickerTape={showTickerTape}
                setShowTickerTape={setShowTickerTape}
                isLivePriceJitter={isLivePriceJitter}
                setIsLivePriceJitter={setIsLivePriceJitter}
            />
        </div>
    )
}
