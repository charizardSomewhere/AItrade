import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'



function Listings(props) {

  const [currentMoney, setCurrentMoney] = useState(props.money);
  const [priceChange, setPriceChange] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {

      const randomPrice = (Math.random() * 9) - 4.5
      setPriceChange(randomPrice)
      setCurrentMoney((latestMoney) =>
        latestMoney + randomPrice);
    }, 2000)
    return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      <div style={{ border: '1px solid white', padding: '10px', margin: '10px', width: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>{props.ticker}</h2>
          <p>${currentMoney.toFixed(2)}</p>
        </div>
        <p style={{ color: priceChange > 0 ? 'green' : 'red' }}>
          {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
        </p>
      </div>
    </>
  )
}

function App() {

  const myPortfolio = [
    { ticker: "AMD", price: 153.34 },
    { ticker: "TSLA", price: 171.23 },
    { ticker: "NVDA", price: 123.16 },
    { ticker: "GOOG", price: 172.30 },
    { ticker: "MSFT", price: 428.72 }
  ];

  return (
    <>
      <h1>⚡ AI Stock Arena</h1>
      <h3>Live Simulation Environment</h3>
      <div>
        {myPortfolio.map((stock) => (
          <Listings key={stock.ticker} ticker={stock.ticker} money={stock.price} />
        ))}
      </div>

    </>
  )
}

export default App
