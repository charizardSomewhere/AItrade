import pandas as pd
import numpy as np

def generate_mock_stock_data(days: int = 500, start_price: float = 150.0, volatility: float = 0.02) -> pd.DataFrame:
    """
    Generates a realistic-looking dataframe of OHLCV (Open, High, Low, Close, Volume) data
    for testing the trading engine without needing external APIs.
    """
    np.random.seed(42) # Consistent data for testing
    
    dates = pd.date_range(end=pd.Timestamp.today(), periods=days, freq='B')
    
    # Generate daily returns
    returns = np.random.normal(loc=0.0005, scale=volatility, size=days)
    
    # Calculate closing prices
    close_prices = start_price * np.exp(np.cumsum(returns))
    
    # Generate O, H, L based on Close to make them somewhat realistic
    open_prices = close_prices * (1 + np.random.normal(0, volatility/4, size=days))
    high_prices = np.maximum(open_prices, close_prices) * (1 + np.abs(np.random.normal(0, volatility/2, size=days)))
    low_prices = np.minimum(open_prices, close_prices) * (1 - np.abs(np.random.normal(0, volatility/2, size=days)))
    
    # Volume
    volumes = np.random.lognormal(mean=15, sigma=1, size=days).astype(int)
    
    df = pd.DataFrame({
        'Date': dates,
        'Open': open_prices,
        'High': high_prices,
        'Low': low_prices,
        'Close': close_prices,
        'Volume': volumes
    })
    
    # Standardize format for ta-lib / pandas-ta
    df.set_index('Date', inplace=True)
    
    return df

if __name__ == "__main__":
    # Test the generator
    print("Generating simulated stock data...")
    data = generate_mock_stock_data(days=10)
    print(data.head())
    print("\nSimulation complete. Data shape:", data.shape)
