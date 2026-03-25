import { useState, useEffect } from 'react'
import './App.css'

// Initial static data for the stocks
const INITIAL_STOCKS = [
  { ticker: 'NVDA', name: 'NVIDIA Corp', price: 125.43, change: 2.5 },
  { ticker: 'MSFT', name: 'Microsoft Corp', price: 420.10, change: 1.2 },
  { ticker: 'GOOGL', name: 'Alphabet Inc', price: 175.20, change: -0.8 },
  { ticker: 'AMD', name: 'Advanced Micro Devices', price: 160.75, change: 4.1 },
  { ticker: 'TSLA', name: 'Tesla Inc', price: 195.60, change: -2.3 },
];

/**
 * Scoreboard component to display the list of stocks.
 * Demonstrates component extraction and props passing.
 */
function Scoreboard({ stocks, onSelect, selectedTicker }) {
  return (
    <div className="scoreboard">
      <h2 className="scoreboard-title">AI Arena Participants</h2>
      <div className="stock-list">
        {stocks.map((stock) => {
          const isSelected = selectedTicker === stock.ticker;
          return (
            <div 
              key={stock.ticker} 
              className={`stock-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(stock.ticker)}
            >
              <div className="stock-card-header">
                <span className="stock-ticker">{stock.ticker}</span>
                <span className="stock-name">{stock.name}</span>
              </div>
              <div className="stock-card-price">
                <span className="price">${stock.price.toFixed(2)}</span>
                <span className={`change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * TickerDetail component to display the selected stock.
 * Demonstrates conditional rendering and props.
 */
function TickerDetail({ stock }) {
  if (!stock) return null;

  return (
    <div className="ticker-detail glass-panel">
      <h2>{stock.name} ({stock.ticker})</h2>
      <div className="detail-price-lg">
        <h1>${stock.price.toFixed(2)}</h1>
        <span className={`change-lg ${stock.change >= 0 ? 'positive' : 'negative'}`}>
          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
        </span>
      </div>
      <div className="detail-stats">
        <div className="stat-box">
          <span className="label">Volume</span>
          <span className="value">{(Math.random() * 10 + 1).toFixed(1)}M</span>
        </div>
        <div className="stat-box">
          <span className="label">Avg Vol (3m)</span>
          <span className="value">{(Math.random() * 10 + 5).toFixed(1)}M</span>
        </div>
        <div className="stat-box">
          <span className="label">Market Cap</span>
          <span className="value">${(Math.random() * 2 + 1).toFixed(2)}T</span>
        </div>
      </div>
      <button className="trade-btn">Trade {stock.ticker}</button>
    </div>
  );
}

/**
 * Main App component.
 * Demonstrates State (useState) and Side-Effects (useEffect).
 */
function App() {
  const [stocks, setStocks] = useState(INITIAL_STOCKS);
  const [selectedTicker, setSelectedTicker] = useState(null);

  // useEffect to randomly update stock prices every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((currentStocks) =>
        currentStocks.map((stock) => {
          // Calculate a random fluctuation between -1.5% and 1.5%
          const fluctuation = (Math.random() * 3 - 1.5) / 100;
          const newPrice = stock.price * (1 + fluctuation);
          
          // Slightly adjust the daily change percentage
          const changeFluctuation = (Math.random() * 0.4 - 0.2);
          
          return {
            ...stock,
            price: newPrice,
            change: stock.change + changeFluctuation
          };
        })
      );
    }, 2000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const selectedStockData = stocks.find((s) => s.ticker === selectedTicker);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>⚡ AI Stock Arena</h1>
        <p>Live Simulation Environment</p>
      </header>

      <main className="dashboard-grid">
        <Scoreboard 
          stocks={stocks} 
          onSelect={setSelectedTicker} 
          selectedTicker={selectedTicker}
        />
        
        <div className="detail-container">
          {selectedStockData ? (
            <TickerDetail stock={selectedStockData} />
          ) : (
            <div className="empty-state glass-panel">
              <div className="empty-icon">📈</div>
              <h3>Select a Stock</h3>
              <p>Click on any participant in the arena to view live details and trading options.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
