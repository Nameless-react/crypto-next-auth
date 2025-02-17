import { NextResponse } from "next/server";

export const GET = async (req, params) => {
    const time = searchParams.get("time");
    const { id } = await params.params

    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${time}`, {
        headers: {
            "x-cg-demo-api-key": process.env.COIN_GEKCO
        }
    });
    const coin = await response.json();
    return NextResponse.json({ prices: coin.prices }, { status: 200 })
}