import { getSession } from "next-auth/react";

export default async function coins (req, res) {
    const { page, id } = req.query
    const session = await getSession({ req });
    const pageParam = page ?? 1;
    
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&${page ? `order=market_cap_desc&per_page=50&page=${pageParam}`: `ids=${id}`}`);
    const data = await response.json();
    if(data) {
        const optimizeData = data.map(coin => ({
            name: coin.name,
            image: coin.image,
            market_cap: coin.market_cap,
            symbol: coin.symbol,
            market_cap_rank: coin.market_cap_rank,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            id: coin.id})) 
        if (page) {
            res.status(200).json({
                optimizeData,
                nextPage: parseInt(page) + 1,
                totalPage: 135,
            });
        } else {
            res.status(200).json(optimizeData);
        }
    } else {
        res.status(404).json({
            response: "Connection failed"
        })
    }
}



