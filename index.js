const fetch = require("node-fetch");
const cron = require("node-cron");
const fs = require("fs");
require("dotenv").config();

const apiKey = process.env.CMC_API_KEY;

if (!apiKey) {
  console.error(`Error: 'CMC_API_KEY' not specified in .env`);
  process.exit(1);
}

const headers = { "X-CMC_PRO_API_KEY": apiKey };
const apiRoot = "https://pro-api.coinmarketcap.com";
const apiLatestQuotes = `${apiRoot}/v1/cryptocurrency/quotes/latest`;

async function fetchQuotes(symbols = "ADA,DOT", currency = "EUR") {
  try {
    const searchParams = new URLSearchParams({
      symbol: symbols,
      convert: currency,
    });
    const quotesResponse = await fetch(`${apiLatestQuotes}?${searchParams}`, {
      method: "GET",
      headers,
      compress: true,
    });
    const quotes = await quotesResponse.json();

    if (quotesResponse.status !== 200) {
      console.error(`Error(CMC): ${quotes.status.error_message}`);
      process.exit(1);
    }

    return quotes;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function loadConfig() {
  try {
    const portfolioString = fs.readFileSync("./config.json", {
      encoding: "utf8",
    });
    const portfolio = JSON.parse(portfolioString);
    return portfolio;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function checkPortfolio() {
  const { currency, portfolio } = loadConfig();
  const symbols = Object.keys(portfolio);
  const quotes = await fetchQuotes(symbols, currency);

  const worth = Object.entries(portfolio).reduce((sum, [symbol, amount]) => {
    const price = quotes.data[symbol].quote[currency].price;
    return sum + price * amount;
  }, 0);

  const now = new Date().toTimeString().substr(0, 8);
  console.log(`[${now}]: ${worth.toFixed(2)} ${currency}`);
}

// check portfolio once on start
checkPortfolio();

// check portfolio every 5 minutes
cron.schedule("*/5 * * * *", () => {
  checkPortfolio();
});
