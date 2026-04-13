'use client';


import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';


function Listings(props) {
  return (
    <>
      <div onClick={props.onCardClick} style={{ border: '1px solid white', padding: '10px', margin: '10px', width: '500px', cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>{props.ticker}</h2>
          <p>${props.money.toFixed(2)}</p>
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

  const [portfolio, setPortfolio] = useState([
    { ticker: "AMD", price: 153.34, startingPrice: 153.34, priceChange: 0, sharesOutstanding: 15000000000, volume: 41600000, avgVolume: 46970000 },
    { ticker: "TSLA", price: 171.23, startingPrice: 171.23, priceChange: 0, sharesOutstanding: 37500000000, volume: 174000000, avgVolume: 61150000 },
    { ticker: "NVDA", price: 123.16, startingPrice: 123.16, priceChange: 0, sharesOutstanding: 24300000000, volume: 29280000, avgVolume: 176950000 },
    { ticker: "GOOG", price: 293.24, startingPrice: 293.24, priceChange: 0, sharesOutstanding: 12070000000, volume: 25600000, avgVolume: 21620000 },
    { ticker: "MSFT", price: 428.72, startingPrice: 428.72, priceChange: 0, sharesOutstanding: 7430000000, volume: 33000000, avgVolume: 35100000 }
  ]);

  const [selectedStockTicker, setSelectedStockTicker] = useState(null);
  const [startingMoney, setStartingMoney] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPortfolio((currentPortfolio) => {
        return currentPortfolio.map((stock) => {
          const randomPrice = (Math.random() * 36) - 18;
          const randomAddedTrade = Math.floor(Math.random() * 1000)
          return {
            ...stock,
            price: stock.price + randomPrice,
            priceChange: randomPrice,
            volume: stock.volume + randomAddedTrade
          }
        });
      });
    }, 2000)

    return () => clearInterval(intervalId);
  }, []);

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
              money={stock.price}
              startPrice={stock.startingPrice}
              priceChange={stock.priceChange}
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
              <p>${selectedStock.price.toFixed(2)}</p>
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
