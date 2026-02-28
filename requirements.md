# AI Stock Advisor - Requirements Document

## 1. Project Overview
The goal is to build a web application that provides AI-driven stock trading suggestions (Buy/Sell) and compares their performance against the S&P 500 (SPY). The application will leverage multiple data sources, including technical indicators, news sentiment, and options flow data, to generate informed trading signals.

## 2. Core Features

### 2.1 AI Trading Suggestions
- **Functionality**: The AI will analyze a specific stock and generate a clear "Buy", "Sell", or "Hold" recommendation.
- **Inputs**:
  - Historical Price Data (OHLCV): Recommended minimum of 5 years (Daily timeframe) to capture Bull and Bear market cycles for robust backtesting.
  - Technical Indicators (RSI, MACD, Moving Averages)
  - Fundamental Data (Earnings, P/E Ratio)
  - **Options Data**: Calls (Bullish) and Puts (Bearish) volume/open interest.
- **Output**: A recommendation accompanied by a confidence score and reasoning.

#### 2.1.1 Strategy Configuration (Default Logic)
The AI will use a weighted scoring system based on the following signals:
1.  **RSI (Relative Strength Index)**:
    -   **Buy Signal**: RSI < 30 (Oversold condition).
    -   **Sell Signal**: RSI > 70 (Overbought condition).
2.  **MACD (Moving Average Convergence Divergence)**:
    -   **Bullish**: MACD line crosses *above* the Signal line.
    -   **Bearish**: MACD line crosses *below* the Signal line.
3.  **Trend Confirmation (SMA 200)**:
    -   **Bullish**: Price is *above* the 200-day Simple Moving Average.
    -   **Bearish**: Price is *below* the 200-day Simple Moving Average.
4.  **News Sentiment**:
    -   **Positive**: Aggregated sentiment score > 0.2.
    -   **Negative**: Aggregated sentiment score < -0.2.
5.  **Final Signal**:
    -   **Strong Buy**: e.g., Oversold RSI + Bullish MACD + Positive Sentiment.
    -   **Buy**: 2/3 Bullish signals.
    -   **Sell**: Overbought RSI or multiple Bearish signals.


### 2.2 Performance Comparison (The "Alpha" Tracker)
- **Functionality**: Simulate the performance of the AI's suggestions and compare it directly to a "Buy and Hold" strategy of the SPY (S&P 500 ETF).
- **Metrics**: 
  - Total Return (%)
  - Sharpe Ratio (Risk-adjusted return)
  - Max Drawdown
- **Visualization**: A line graph showing the equity curve of the AI Strategy vs. SPY over time.

### 2.3 News Sentiment Analysis
- **Functionality**: The AI will ingest real-time news articles and headlines related to the specific stock.
- **Processing**: Use Natural Language Processing (NLP) to determine if the news is Positive, Negative, or Neutral.
- **Impact Assessment**: The AI will adjust its trading signal based on the aggregated sentiment score (e.g., a "Buy" signal might be invalidated by highly negative breaking news).

### 2.4 Options Flow Analysis ("Smart Money" Tracking)
- **Concept**: "Tickets" refer to Options contracts (Calls and Puts).
- **Functionality**: Monitor unusual options activity and Put/Call ratios.
  - **High Call Volume**: Bullish sentiment (investors betting the price will rise).
  - **High Put Volume**: Bearish sentiment (investors betting the price will fall).
- **Integration**: This data acts as a crucial "Smart Money" indicator, often preceding price movements.

### 2.5 Automated Data Scheduler
- **Functionality**: A background process/scheduler (e.g., Cron job or Celery task) that runs automatically every **15 minutes**.
- **Data Source**: **Alpha Vantage API** (Primary source for real-time price and news).
- **Workflow**:
  1.  **Fetch Data**: Retrieve the latest stock price and news headlines every 15 minutes.
  2.  **AI Analysis**: Immediately feed this new data into the AI Engine.
  3.  **Signal Update**: The AI re-evaluates its position (Buy/Sell/Hold) based on the fresh data and updates the dashboard in real-time.

## 3. User Interface (UI) Requirements - "Alpha Arena" Style

### 3.1 Header & Navigation
- **Live Ticker Tape**: A scrolling or static bar at the top displaying real-time prices of major indices (SPY, QQQ) and the active stock (e.g., NVDA).
- **Navigation**: Simple links for "LIVE", "LEADERBOARD", "MODELS".

### 3.2 Main Dashboard (The Arena)
- **Primary Chart**: A large, clean multi-line chart comparing "Total Account Value" over time.
    - **Y-Axis**: Total Portfolio Value ($).
    - **X-Axis**: Timeframe (with toggles for 1D, 1W, 1M, ALL).
- **Competitors**: 
    - **Line A (Hero)**: The AI's Strategy Performance (e.g., "DeepSeek Trader").
    - **Line B (Benchmark)**: The SPY Buy & Hold Strategy.
    - **Line C (Stock)**: The underlying stock's Buy & Hold performance.
- **Visuals**:
    - Distinct colors for each line (Neons/Pastels against a clean background).
    - **End-of-Line Badges**: Circular icons/values on the right Y-axis showing the current total value for each strategy.

### 3.3 Footer / Legend Scoreboard
- **Strategy Cards**: A row of cards at the bottom, one for each strategy/asset.
    - **Content**: Strategy Name (e.g., "AI Trader"), Current Value (e.g., "$12,450"), and PnL% (e.g., "+24.5%").
    - **Highlighting**: The winning strategy should be visually emphasized (e.g., glowing border or distinct background).

### 3.4 Detailed Analysis View (Drill-down)
- **News Feed**: List of relevant news articles with their sentiment tags.
- **Options Flow**: Visual representation of Call vs. Put volume.

### 3.5 AI Interaction Log (Right Panel)
- **Functionality**: A dedicated panel on the right side of the screen that displays the raw or formatted logs of the AI's decision-making process.
- **Content**:
  - **Request**: The data sent to the AI (e.g., "Analyzing AAPL with RSI=28, Sentiment=0.4").
  - **Response**: The AI's output (e.g., "Signal: BUY. Reason: RSI Oversold + Positive News").
- **Purpose**: To provide transparency and "explainability" so the user can see exactly *why* the AI made a specific recommendation.

## 4. Technical Stack Recommendations

### Frontend
- **Framework**: **Next.js (React)** using **TypeScript (JavaScript)**.
  - *Why?*: This provides the most flexibility to create custom, high-performance "Alpha Arena" charts and animations that standard Python dashboards (like Streamlit) struggle with.
- **Charts**: Recharts or Lightweight Charts (TradingView) for financial visualization.
- **Styling**: Tailwind CSS for modern, responsive design.

### Backend
- **Language**: Python (FastAPI or Flask) - Preferred for financial data analysis and AI integration.
- **AI/ML**: 
  - PyTorch/TensorFlow for predictive models.
  - Hugging Face Transformers for News Sentiment Analysis.
- **Database Strategy**:
  - **SQLite**: Lightweight, file-based database (e.g., `trade_data.db`). Zero configuration, no server required, perfect for single-user apps with moderate data needs.

### External APIs (Data Sources)
- **Market Data**: Alpha Vantage, Polygon.io, or Yahoo Finance (yfinance).
- **News Data**: NewsAPI, Benzinga, or Bloomberg API.
- **Options Data**: Unusual Whales (if available) or CBOE data feeds.

## 5. Next Steps
1.  **Prototype**: Build a simple script to fetch data for one stock and compare it to SPY.
2.  **Backtesting**: Run the initial AI logic against historical data to verify if it *would have* beaten SPY.
3.  **Frontend**: Create the dashboard to visualize these results.
