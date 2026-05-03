'use client';


import Image from "next/image";
import styles from "./page.module.css";
import { useState, useContext } from 'react';
import { StockContext } from './StockContext';


function Listings(props) {
  return (
    <>
      <div onClick={props.onCardClick} style={{ border: '1px solid var(--foreground)', padding: '10px', margin: '10px', width: '500px', cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>{props.ticker}</h2>
          <p>{props.symbol}{props.money.toFixed(2)}</p>
        </div>
        <p style={{ color: props.priceChange > 0 ? 'green' : 'red' }}>
          {props.priceChange > 0 ? '+' : ''}{props.priceChange.toFixed(2)}%
        </p>
      </div>
    </>
  )
}


// export default function Home() {

//   const [money, setMoney] = useState(100);

//   return (
//     <>
//       <p>test</p>
//       <button style={{ height: '500px', width: '200px' }} onClick={() => console.log(Math.random() * 54 - 33)}>
//         Click Me!
//       </button>

//       {/* This Link automatically navigates to your new dashboard! */}
//       <div style={{ marginTop: '30px' }}>
//         <a
//           href="/dashboard"
//           style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
//         >
//           Go to the Dashboard Strategy Page! {'>'}
//         </a>
//       </div>
//     </>
//   );
// }

export default function App() {

  const { portfolio, currency, currencyMultipliers, currencySymbols } = useContext(StockContext);

  const [selectedStockTicker, setSelectedStockTicker] = useState(null);
  const [startingMoney, setStartingMoney] = useState(null);

  const selectedStock = portfolio.find(stock => stock.ticker === selectedStockTicker);

  return (
    <>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>⚡ AI Stock Arena</h1>
      <h3 style={{ display: 'flex', justifyContent: 'center' }}>Live Simulation Environment</h3>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>

        <div>
          {portfolio.map((stock) => (
            <Listings
              key={stock.ticker}
              ticker={stock.ticker}
              money={stock.price * currencyMultipliers[currency]}
              startPrice={stock.startingPrice}
              priceChange={stock.priceChange}
              symbol={currencySymbols[currency]}
              onCardClick={() => {
                setSelectedStockTicker(stock.ticker);
                setStartingMoney(stock.startingPrice);
              }}
            />
          ))}
        </div>

        <div style={{ padding: '20px', width: '400px', borderLeft: '1px solid gray' }}>
          {selectedStock ? (
            <div>
              <h1>{selectedStock.ticker} Details</h1>
              <p>{currencySymbols[currency]}{selectedStock.price.toFixed(2)}</p>
              <p style={{ color: selectedStock.priceChange > 0 ? 'green' : 'red' }}>
                Latest Tick: {selectedStock.priceChange > 0 ? '+' : ''}{selectedStock.priceChange.toFixed(2)}
              </p>
              <p style={{ color: selectedStock.price > selectedStock.startingPrice ? 'green' : 'red' }}>
                Total Change: {selectedStock.price > selectedStock.startingPrice ? '+' : ''}
                {(selectedStock.price - selectedStock.startingPrice).toFixed(2)}
                ({(((selectedStock.price - selectedStock.startingPrice) / selectedStock.startingPrice) * 100).toFixed(2)}%)
              </p>
              <p>Market Cap: {(selectedStock.price * selectedStock.sharesOutstanding / 1000000000000).toFixed(2)}T</p>
              <p>Volume: {(selectedStock.volume / 1000000).toFixed(2)}M</p>
              <p>Average Volume: {(selectedStock.avgVolume / 1000000).toFixed(2)}M</p>
              <button
                onClick={() => setSelectedStockTicker(null)}
                style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}
              >
                Close Details
              </button>
            </div>
          ) : (
            <div>
              <h1>📈</h1>
              <h2>Select a Stock</h2>
              <p>Click on any participant in the arena to view live details and trading options.</p>
            </div>
          )}
        </div>
      </div >
    </>
  )
}
