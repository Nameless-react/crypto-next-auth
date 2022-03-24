export default async function history(req, res) {
    const { time, id } = req.query
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${time}&interval=hourly`);
    const coin = await response.json();
    res.status(200).json(coin.prices)
}