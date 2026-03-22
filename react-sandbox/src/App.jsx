import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function ScoreDisplay(props) {

  const [currentMoney, setCurrentMoney] = useState(props.money)
  useEffect(() => {
    const intervalId = setInterval(() => {

      setCurrentMoney((latestMoney) => {
        const randomPrice = (Math.random() * 6) - 3
        return latestMoney + randomPrice
      })
    }, 2000)
    return () => clearInterval(intervalId);
  }, [])

  const inputRef = useRef(null)

  const [showDetails, setShowDetails] = useState(false)


  return (
    <div style={{ border: '1px solid white', padding: '10px', margin: '10px' }}>
      <h2>{props.text}</h2>
      <p style={{ color: currentMoney > props.money ? 'green' : 'red' }}>${currentMoney.toFixed(2)}</p>
      <input style={{ marginRight: '8px' }} ref={inputRef} placeholder="Placeholder text" />
      <button onClick={() => { inputRef.current.focus() }}>Focus Input!</button>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
        <button onClick={() => setCurrentMoney(currentMoney + 15)}>Pump by $15!</button>
        <button onClick={() => setCurrentMoney(currentMoney - 15)}>Dump by $15!</button>
        <button onClick={() => setCurrentMoney(currentMoney - currentMoney)}>Set to $0!</button>
        <button onClick={() => setCurrentMoney(props.money)}>Reset!</button>
      </div>
      <button onClick={() => setShowDetails(!showDetails)}>Toggle Details</button>
      {showDetails && (<div style={{ marginTop: '10px', backgroundColor: '#333', padding: '10px' }}>
        <p>📊 52-Week High: ${props.high}</p>
        <p>🗞️ News Sentiment: {props.news}</p>
      </div>
      )}
    </div>
  )
}

function App() {

  return (
    <>

      <h1>Hello World!</h1>
      <div>
        <h1>Live Scores</h1>
        <ScoreDisplay text="AAPL" money={194.56} news="Bullish" high={300.22} />
        <ScoreDisplay text="TSLA" money={363.54} news="Bearish" high={414.48} />
        <ScoreDisplay text="NVDA" money={193.49} news="Bearish" high={193.91} />
      </div>

    </>
  )
}

export default App
