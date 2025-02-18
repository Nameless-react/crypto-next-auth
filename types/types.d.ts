import { Dispatch, SetStateAction } from "react"

export type Coin = {
    id?: string
    name: string,
    symbol?: string,
    market_cap: number | string,
    price_change_percentage_24h: number | string,
    current_price: number | string,
    image?: string,
    market_cap_rank: number | string,
}

export type CoinId = Pick<Coin, "id">;
export type CoinName = Pick<Coin, "name">;
export type CoinSymbol = Pick<Coin, "symbol">;
export type CoinImage = Pick<Coin, "image">;

export type Time = {
    period: number,
    selected: boolean,
    id: number,
    tag: string
}

export type New = {
    title: string,
    author: string,
    description: string,
    urlToImage: string,
    url: string
}  


export type Item = {
    id: string,
    image: string,
    name: string,
    symbol: string,
    index: number 
}

export type SideBar = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}