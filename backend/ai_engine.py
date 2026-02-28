import pandas as pd
import pandas_ta as ta
from typing import Dict, Any

def calculate_technicals(df: pd.DataFrame) -> pd.DataFrame:
    """
    Takes a dataframe of OHLCV data and appends technical indicators.
    """
    # Create a copy to prevent SettingWithCopy warnings
    data = df.copy()
    
    # 1. RSI (Relative Strength Index) - 14 period is standard
    data['RSI'] = ta.rsi(data['Close'], length=14)
    
    # 2. MACD (Moving Average Convergence Divergence)
    macd = ta.macd(data['Close'])
    # macd returns 3 columns: MACD_12_26_9, MACDh_12_26_9 (Histogram), MACDs_12_26_9 (Signal)
    # We concatenate them to our main dataframe
    data = pd.concat([data, macd], axis=1)
    
    # 3. Simple Moving Averages for Trend detection
    data['SMA_50'] = ta.sma(data['Close'], length=50)
    data['SMA_200'] = ta.sma(data['Close'], length=200)
    
    return data

def generate_signal(data: pd.DataFrame) -> Dict[str, Any]:
    """
    Evaluates the most recent technical indicators and generates a trading signal.
    """
    if data.empty or len(data) < 200:
        return {"signal": "UNKNOWN", "score": 0, "reasoning": "Not enough data"}
        
    # Get the most recent day's data
    last_row = data.iloc[-1]
    
    score = 0
    reasons = []
    
    # -- Logic 1: RSI (Oversold/Overbought) --
    rsi = last_row.get('RSI', 50)
    if pd.isna(rsi):
        rsi = 50
        
    if rsi < 30:
        score += 2 # Strong Buy
        reasons.append(f"RSI is oversold ({rsi:.1f})")
    elif rsi > 70:
        score -= 2 # Strong Sell
        reasons.append(f"RSI is overbought ({rsi:.1f})")
    else:
        reasons.append(f"RSI is neutral ({rsi:.1f})")
        
    # -- Logic 2: MACD (Momentum Crossover) --
    # Find the dynamic column names pandas_ta generated
    macd_cols = [c for c in data.columns if c.startswith('MACD_')]
    signal_cols = [c for c in data.columns if c.startswith('MACDs_')]
    
    if macd_cols and signal_cols:
        macd_val = last_row[macd_cols[0]]
        signal_val = last_row[signal_cols[0]]
        
        if not pd.isna(macd_val) and not pd.isna(signal_val):
            if macd_val > signal_val:
                score += 1
                reasons.append("Bullish MACD crossover")
            elif macd_val < signal_val:
                score -= 1
                reasons.append("Bearish MACD crossover")
                
    # -- Logic 3: Trend (SMA 200) --
    close = last_row['Close']
    sma200 = last_row.get('SMA_200', 0)
    
    if not pd.isna(sma200) and sma200 > 0:
        if close > sma200:
            score += 1
            reasons.append("Price is in long-term uptrend (> SMA200)")
        else:
            score -= 1
            reasons.append("Price is in long-term downtrend (< SMA200)")
            
    # -- Final Decision Engine --
    if score >= 2:
        verdict = "BUY"
    elif score <= -2:
        verdict = "SELL"
    else:
        verdict = "HOLD"
        
    return {
        "signal": verdict,
        "score": score,
        "reasoning": " | ".join(reasons)
    }

if __name__ == "__main__":
    # Test the logic locally
    from data_simulator import generate_mock_stock_data
    
    print("Generating simulated data...")
    raw_data = generate_mock_stock_data(days=300)
    
    print("Calculating technical indicators...")
    tech_data = calculate_technicals(raw_data)
    
    print("Evaluating signal on the final day...")
    result = generate_signal(tech_data)
    
    print("\n--- AI Engine Result ---")
    print(f"Decision:  {result['signal']}")
    print(f"Net Score: {result['score']}")
    print(f"Reasoning: {result['reasoning']}")
