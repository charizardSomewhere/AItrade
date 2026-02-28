import { X } from 'lucide-react'

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    isCompactView: boolean;
    setIsCompactView: (v: boolean) => void;
    showTickerTape: boolean;
    setShowTickerTape: (v: boolean) => void;
    isLivePriceJitter: boolean;
    setIsLivePriceJitter: (v: boolean) => void;
}

export default function SettingsModal({
    isOpen,
    onClose,
    isCompactView,
    setIsCompactView,
    showTickerTape,
    setShowTickerTape,
    isLivePriceJitter,
    setIsLivePriceJitter
}: SettingsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#12121a] border border-[#1e1e2e] shadow-2xl rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e2e] bg-[#0d0d14]">
                    <h2 className="text-lg font-bold text-slate-100">Settings</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-[#1e1e2e]"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-6">

                    {/* Theme Section */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Interface</h3>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-200">Compact View</p>
                                <p className="text-[10px] text-slate-500">Reduce padding and font sizes</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isCompactView}
                                    onChange={(e) => setIsCompactView(e.target.checked)}
                                />
                                <div className="w-9 h-5 bg-[#1e1e2e] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-200">Show Ticker Tape</p>
                                <p className="text-[10px] text-slate-500">Display global indices at the top</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={showTickerTape}
                                    onChange={(e) => setShowTickerTape(e.target.checked)}
                                />
                                <div className="w-9 h-5 bg-[#1e1e2e] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* Data Section */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data Source (Mock UI)</h3>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-200">Live Price Jitter</p>
                                <p className="text-[10px] text-slate-500">Simulate live market ticks</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isLivePriceJitter}
                                    onChange={(e) => setIsLivePriceJitter(e.target.checked)}
                                />
                                <div className="w-9 h-5 bg-[#1e1e2e] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* API Key Placeholder */}
                    <div className="flex flex-col gap-2 mt-2">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">API Configuration</h3>
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] text-slate-400">Alpha Vantage API Key</label>
                            <input
                                type="password"
                                placeholder="sk-..."
                                className="bg-[#0d0d14] border border-[#1e1e2e] rounded-md px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
