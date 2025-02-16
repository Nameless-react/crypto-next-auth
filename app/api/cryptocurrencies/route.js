import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    const page = req.nextUrl.searchParams.get("page");
    const id = req.nextUrl.searchParams.get("id");

    const pageParam = page ?? 1;
    
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&${page ? `order=market_cap_desc&per_page=50&page=${pageParam}`: `ids=${id}`}`, {
        headers: {
            "x-cg-demo-api-key": process.env.COIN_GEKCO
        }
    });
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
            return NextResponse.json({
                optimizeData,
                nextPage: parseInt(page) + 1,
                totalPage: 135,
            }, { status: 200 });
        } else {
            return NextResponse.json(optimizeData, { status: 200 });
        }
    } else {
        return NextResponse.json({
            response: "Connection failed"
        }, { status: 500 })
    }
}



