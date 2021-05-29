
# Coin Portfolio Checker

A small script to check how much your coin portfolio is currently worth.

Runs a check every 5 minutes.


## Sample output

```bash
[15:01:18]: 32907.78 EUR
```

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CMC_API_KEY`: API-Key for [Coinmarketcap](https://pro.coinmarketcap.com/) (Basic Tier is Free)

## Config (Portfolio)

You need to set up a config.json with your portfolio.

```json
{
  "currency": "EUR",
  "portfolio": {
    "ADA": 1234.567,
    "DOT": 1234.567,
    "ERG": 1234.567
  }
}
```

`currency`: Currency used for conversion. ([List of fiat currencies](https://coinmarketcap.com/api/documentation/v1/#section/Standards-and-Conventions))

`portfolio`: Key-value pairs (coin-symbol: coin-amount)
## Run Locally

Clone the project

```bash
  git clone https://github.com/smnhgn/coin-portfolio-checker.git
```

Go to the project directory

```bash
  cd coin-portfolio-checker
```

Install dependencies

```bash
  npm install
```

Run the script

```bash
  npm start
```

  