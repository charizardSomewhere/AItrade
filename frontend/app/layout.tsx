import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'AI Stock Arena — AI-Powered Trading Intelligence',
    description: 'Compare AI trading strategies vs SPY in real-time. Powered by news sentiment and options flow.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-[#0a0a0f] text-slate-200 antialiased">{children}</body>
        </html>
    )
}
