

const portfolio = [{ ticker: "AAPL", price: 150.00 }, { ticker: "TSLA", price: 200.00 }, { ticker: "NVDA", price: 193.44 }, { ticker: "GOOG", price: 300.11 }]



const doubled = portfolio.map(function (stock) {
    return stock.price * 2;
});

function updatePrices(stocks) {
    stocks.map(function (stock) {
        const percentChange = (Math.random() * 0.1) - 0.05;
        stock.price += stock.price * percentChange;
        return stock;
    });
}


function printStockBoard(stocks) {

    for (let i = 0; i < stocks.length; i++) {
        let stock = stocks[i];
        console.log(`${stock.ticker} : $${stock.price.toFixed(2)}`);
    }
}


setInterval(() => {
    updatePrices(portfolio)
    printStockBoard(portfolio)
}, 2000)






