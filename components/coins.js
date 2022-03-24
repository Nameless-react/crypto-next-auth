import style from "../styles/Coin.module.css";
import url from "../config/index";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Coins(props) {
    const router = useRouter();

    return (
        <div className={props.name !== "Coin" ? style.coins : style.coinHeader} onClick={() => props.name !== "Coin" ? router.push(`${url}/crypto/${props.id}`) : ""}>
            <h3 className={style.rank}>{props.market_cap_rank === "#" ? "#" : props.market_cap_rank}</h3>
            <div className={style.imgContainer}>
                {props.image && 
                    <Image src={props.image} 
                        layout="fill"
                />}
            </div>
            {props.name !== "Coin" ? <h3 className={style.name}>{props.name}</h3> : <h3 className={style.nameStat}>{props.name}</h3>}
            <h3 className={style.symbol}>{props.symbol}</h3>
            <p className={style.marketCap}>{props.market_cap === "Market Cap." ? "" : "$"}{props.market_cap}</p>
            <p className={style.price}>{props.current_price === "Price" ? "" : "$"}{props.current_price}</p>
            <p className={props.price_change_percentage_24h > 0 ? style.growth : style.losses}>{props.price_change_percentage_24h}%</p>
        </div>
    )
}