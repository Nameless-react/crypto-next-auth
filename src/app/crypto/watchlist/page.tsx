"use client"
import React, { JSX, useEffect, useState } from "react";
import style from "../../../../styles/Coin.module.css"
import Coin from "../../../../components/Coin";
import Meta from "../../../../components/Head";
import { type Coin as CoinType } from "../../../../types/types";


export default function Watch(): JSX.Element {
    const [watchList, setWatchList] = useState<CoinType[]>([]);
    // useEffect(() => {
    //     let list = []
    //     for (let i = 0; i < localStorage.length; i++) {
    //         const coin = localStorage.key(i);
    //         const coinData: Coin = JSON.parse(localStorage.getItem(coin));
    //         if(!coinData.market_cap_rank) continue
    //         list.push(coinData);
    //     }
    //     const component = list.length === 0 ? <h4>Nothing in the watchlist</h4> : list.map((coin: Coin, index) => {
    //         return <Coins
    //             {...coin}
    //             market_cap_rank={index + 1}
    //             key={coin.id}
    //         />
    //     });
    //     setWatchList(component)
    // }, [])

    return ( 
        <>
            <Meta title="Watch List"/>
            <h4 className={style.watchTitle}>Watch List</h4>
            <div className={style.list}>
                {/* {watchList} */}
            </div>
        </>
    )
}