'use client';

import { createContext, useState, useEffect } from 'react';

export const StockContext = createContext();

export function StockProvider({ children }) {
  const [portfolio, setPortfolio] = useState([
    { ticker: "AMD", price: 153.34, startingPrice: 153.34, priceChange: 0, sharesOutstanding: 15000000000, volume: 41600000, avgVolume: 46970000 },
    { ticker: "TSLA", price: 171.23, startingPrice: 171.23, priceChange: 0, sharesOutstanding: 37500000000, volume: 174000000, avgVolume: 61150000 },
    { ticker: "NVDA", price: 123.16, startingPrice: 123.16, priceChange: 0, sharesOutstanding: 24300000000, volume: 29280000, avgVolume: 176950000 },
    { ticker: "GOOG", price: 293.24, startingPrice: 293.24, priceChange: 0, sharesOutstanding: 12070000000, volume: 25600000, avgVolume: 21620000 },
    { ticker: "MSFT", price: 428.72, startingPrice: 428.72, priceChange: 0, sharesOutstanding: 7430000000, volume: 33000000, avgVolume: 35100000 }
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPortfolio((currentPortfolio) => {
        return currentPortfolio.map((stock) => {
          const randomPrice = (Math.random() * 36) - 18;
          const randomAddedTrade = Math.floor(Math.random() * 1000);
          return {
            ...stock,
            price: stock.price + randomPrice,
            priceChange: randomPrice,
            volume: stock.volume + randomAddedTrade
          };
        });
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StockContext.Provider value={{ portfolio }}>
      {children}
    </StockContext.Provider>
  );
}
