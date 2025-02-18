export default async function coins (req, res) {
    const { q } = req.query
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12000&page=1");
    const data = await response.json();
    if(data && q) {
        const coins = data.filter(coin => coin.name.toLowerCase().includes(q.toLowerCase())  || coin.symbol.toLowerCase().includes(q.toLowerCase()));
        const minimzeCoins = coins.map(coin => ({image: coin.image, name: coin.name, symbol: coin.symbol, id: coin.id}))
        res.status(200).json(minimzeCoins);
    } else {
        res.status(404).json({
            response: "Connection failed"
        })
    }
}

