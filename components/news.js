import { useEffect, useState } from "react"
import url from  "../config/index";
import Link from "next/link";
import style from "../styles/Coin.module.css";


export default function News(props) {
    const [news, setNews] = useState([]);
    useEffect(() => {
       const fetching = async () => {
            const response = await fetch(`${url}/api/cryptocurrencies/news?coin=cryptocurrencies`);
            const data = await response.json();
            setNews(data);
       };

       fetching()
    }, [props.coin])

    const News = news ? news.map((article, index) => (
        <div className={style.new} key={index + 1}>
            <h5>{article.title}</h5>
            <p className={style.author}>By: {article.author ? article.author : "Anonymus"}</p>
            <p>{article.description}</p>
            <img src={article.urlToImage} alt=""/>
            <Link href={article.url}><a className={style.more}>More &rarr;</a></Link>
        </div>
    )) : <h3>Request Failed</h3>

    return (
        <div className={style.news}>
            {News}
        </div>
    )
}