// Mock data for UI development (no real API calls)

export const MOCK_TICKER = 'NVDA'

export const MOCK_TICKERS = [
    { symbol: 'NVDA', price: 875.40, change: +2.34 },
    { symbol: 'AAPL', price: 182.63, change: -0.87 },
    { symbol: 'TSLA', price: 199.14, change: +1.12 },
    { symbol: 'SPY', price: 511.22, change: +0.55 },
    { symbol: 'MSFT', price: 414.80, change: +0.91 },
    { symbol: 'AMZN', price: 178.25, change: -0.33 },
    { symbol: 'META', price: 505.10, change: +3.22 },
    { symbol: 'GOOGL', price: 163.42, change: -1.05 },
]

// Add function to compute seed from string
function getSeed(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

// Generate mock equity curve (starting at $10,000)
function generateCurve(days: number, trend: number, volatility: number, seed: number = 0): { date: string; value: number }[] {
    const result = []
    let value = 10000
    const start = new Date('2024-01-01T00:00:00Z') // Fixed timezone to prevent SSR mismatch

    // Simple predictable pseudo-random generator to prevent hydration errors
    for (let i = 0; i < days; i++) {
        const date = new Date(start)
        date.setDate(start.getDate() + i)
        if (date.getDay() === 0 || date.getDay() === 6) continue

        // Pseudo-random value based on the index and seed
        const pseudoRandom = (Math.sin(i * 12.345 + seed) + 1) / 2; // Returns 0 to 1

        value = value * (1 + (trend + (pseudoRandom - 0.5) * volatility))
        result.push({ date: date.toISOString().split('T')[0], value: parseFloat(value.toFixed(2)) })
    }
    return result
}

export function getMockCurves(ticker: string) {
    const seed = getSeed(ticker);
    return {
        aiCurve: generateCurve(400, 0.0012 + (Math.abs(seed) % 10) / 10000, 0.025 + (Math.abs(seed) % 10) / 1000, seed),
        spyCurve: generateCurve(400, 0.0005, 0.010, 888), // SPY is constant
        stockCurve: generateCurve(400, 0.0018 + (Math.abs(seed) % 20) / 10000, 0.040 + (Math.abs(seed) % 15) / 1000, seed + 100)
    };
}

export const MOCK_NEWS = [
    {
        id: 1,
        headline: 'NVDA posts record Q4 revenue, beats estimates across the board',
        source: 'Bloomberg',
        time: '14 min ago',
        sentiment: 'positive' as const,
        impact: 'HIGH',
    },
    {
        id: 2,
        headline: 'Jensen Huang teases next-gen Blackwell GPU with 2x performance leap',
        source: 'Reuters',
        time: '1 hr ago',
        sentiment: 'positive' as const,
        impact: 'MEDIUM',
    },
    {
        id: 3,
        headline: 'Analysts raise NVDA price target to $1,100 following earnings beat',
        source: 'CNBC',
        time: '2 hr ago',
        sentiment: 'positive' as const,
        impact: 'MEDIUM',
    },
    {
        id: 4,
        headline: 'Chip export restrictions could dampen NVDA China revenue by 15%',
        source: 'WSJ',
        time: '4 hr ago',
        sentiment: 'negative' as const,
        impact: 'HIGH',
    },
    {
        id: 5,
        headline: 'NVDA insider sold 50k shares; routine or a signal?',
        source: 'Barron\'s',
        time: '6 hr ago',
        sentiment: 'neutral' as const,
        impact: 'LOW',
    },
]

export const MOCK_OPTIONS = {
    callVolume: 145200,
    putVolume: 62800,
    ratio: 2.31,
    unusualActivity: [
        { strike: '$900C', expiry: 'Mar 21', volume: '28.4K', oi: '12.1K', type: 'CALL' },
        { strike: '$850C', expiry: 'Feb 28', volume: '19.2K', oi: '8.3K', type: 'CALL' },
        { strike: '$800P', expiry: 'Mar 21', volume: '14.7K', oi: '5.9K', type: 'PUT' },
    ],
}

export const MOCK_AI_LOGS = [
    {
        id: 1,
        time: '17:45:02',
        request: 'Analyze NVDA | RSI=28.4 | MACD=+1.2 | SMA200=above | Sentiment=+0.72 | Options=Bullish (P/C: 0.43)',
        response: 'Signal: BUY (Strong) | Score: 4/5 | Reason: RSI oversold + Bullish MACD crossover + Positive news sentiment + Smart money (calls dominant)',
        signal: 'BUY',
    },
    {
        id: 2,
        time: '17:30:01',
        request: 'Analyze NVDA | RSI=31.2 | MACD=+0.8 | SMA200=above | Sentiment=+0.55 | Options=Neutral (P/C: 0.88)',
        response: 'Signal: BUY | Score: 3/5 | Reason: Emerging oversold RSI + Positive sentiment, watching for MACD confirmation',
        signal: 'BUY',
    },
    {
        id: 3,
        time: '17:15:00',
        request: 'Analyze NVDA | RSI=45.0 | MACD=-0.3 | SMA200=above | Sentiment=+0.10 | Options=Neutral (P/C: 1.02)',
        response: 'Signal: HOLD | Score: 1/5 | Reason: Mixed signals. RSI neutral, slight bearish MACD, weak sentiment',
        signal: 'HOLD',
    },
    {
        id: 4,
        time: '17:00:03',
        request: 'Analyze NVDA | RSI=72.1 | MACD=-1.1 | SMA200=above | Sentiment=-0.30 | Options=Bearish (P/C: 1.45)',
        response: 'Signal: SELL | Score: -3/5 | Reason: RSI overbought + Bearish MACD + Negative news headline (export restrictions)',
        signal: 'SELL',
    },
    {
        id: 5,
        time: '16:45:10',
        request: 'Analyze NVDA | Volatility=High (VIX 21) | OrderBook: Heavy resistance at $900 | Flow: Large put sweep',
        response: 'Signal: HOLD | Score: 0/5 | Reason: Approaching psychological resistance level. Institutional put buying detected. Waiting for clear direction.',
        signal: 'HOLD',
    },
    {
        id: 6,
        time: '16:30:05',
        request: 'Analyze AAPL | RSI=22.5 | MACD=-2.4 | SMA200=below | Sentiment=-0.80 | Options=Bearish (P/C: 1.80)',
        response: 'Signal: SELL (Strong) | Score: -5/5 | Reason: Extreme oversold bounce failing. Support broken. Aggressive short flow detected.',
        signal: 'SELL',
    },
    {
        id: 7,
        time: '16:15:00',
        request: 'Analyze TSLA | RSI=48.2 | MACD=+0.1 | Breakout pattern detected on 15m chart | Volume=2x avg',
        response: 'Signal: BUY | Score: 3/5 | Reason: Intraday wedge breakout confirmed with volume. Short-term momentum is shifting positive.',
        signal: 'BUY',
    },
    {
        id: 8,
        time: '16:00:22',
        request: 'Analyze MSFT | Price near ATH | RSI=65.0 | Earnings call in 2 days | Sentiment=+0.45',
        response: 'Signal: HOLD | Score: 1/5 | Reason: Bullish technicals but high pre-earnings IV crush risk. Recommended to hold existing positions only.',
        signal: 'HOLD',
    },
]

export function getMockSignal(ticker: string) {
    const seed = getSeed(ticker);
    const actions = ['BUY', 'SELL', 'HOLD'] as const;
    const action = actions[Math.abs(seed) % 3];
    const confidence = 50 + (Math.abs(seed) % 50);
    const tickerMock = MOCK_TICKERS.find((t) => t.symbol === ticker);
    const price = tickerMock ? tickerMock.price : 100 + (Math.abs(seed) % 900);
    const sentimentScore = ((seed % 100) / 100).toFixed(2);
    const sentimentLabel = Number(sentimentScore) > 0.2 ? 'Positive' : Number(sentimentScore) < -0.2 ? 'Negative' : 'Neutral';

    return {
        action,
        confidence,
        price,
        sentimentScore: Number(sentimentScore),
        sentimentLabel
    }
}
