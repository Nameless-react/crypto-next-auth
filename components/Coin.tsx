"use client"
import React from "react";
import style from "../styles/Coin.module.css";
import url from "../config/index";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import { type Coin } from "../types/types";




export default function Coins({ name, symbol, market_cap, price_change_percentage_24h, current_price, image, market_cap_rank, id } : Coin): JSX.Element {
    const router = useRouter();

    return (
        <div className={name !== "Coin" ? style.coins : style.coinHeader} onClick={() => name !== "Coin" ? router.push(`${url}crypto/${id}`) : ""}>
            <h3 className={style.rank}>{market_cap_rank === "#" ? "#" : market_cap_rank}</h3>
            <div className={style.imgContainer}>
                {image && 
                    <Image alt="" src={image} 
                        layout="fill"
                />}
            </div>
            {name !== "Coin" ? <h3 className={style.name}>{name}</h3> : <h3 className={style.nameStat}>{name}</h3>}
            <h3 className={style.symbol}>{symbol}</h3>
            <p className={style.marketCap}>{market_cap === "Market Cap." ? "" : "$"}{market_cap}</p>
            <p className={style.price}>{current_price === "Price" ? "" : "$"}{current_price}</p>
            <p className={Number(price_change_percentage_24h) > 0 ? style.growth : style.losses}>{price_change_percentage_24h}%</p>
        </div>
    )
}