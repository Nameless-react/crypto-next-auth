import { useEffect, useState } from "react";
import style from "../../styles/Coin.module.css"
import Coin from "../../components/coins";
import Meta from "../../components/Head";

export default function Watch() {
    const [watchList, setWatchList] = useState([]);
    useEffect(() => {
        let list = []
        for (let i = 0; i < localStorage.length; i++) {
            const coin = localStorage.key(i);
            const coinData = JSON.parse(localStorage.getItem(coin));
            if(!coinData.market_cap_rank) continue
            list.push(coinData);
        }
        const component = list.length === 0 ? <h4>Nothing in the watchlist</h4> : list.map((coin, index) => {
            return <Coin
                {...coin}
                market_cap_rank={index + 1}
                key={coin.id}
            />
        });
        setWatchList(component)
    }, [])

    return ( 
        <>
            <Meta title="Watch List"/>
            <h4 className={style.watchTitle}>Watch List</h4>
            <div className={style.list}>
                {watchList}
            </div>
        </>
    )
}