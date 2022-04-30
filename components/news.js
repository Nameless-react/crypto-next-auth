import Error from "./Error";
import Link from "next/link";
import style from "../styles/Coin.module.css";


export default function News(props) {
    if (props.news.length === 0) {
        return <Error message="FailedRequest" />
    }

    const News = props?.news?.map((article, index) => (
        <div className={style.new} key={index + 1}>
            <h5>{article.title}</h5>
            <p className={style.author}>By: {article.author ? article.author : "Anonymus"}</p>
            <p>{article.description}</p>
            <img src={article.urlToImage} alt=""/>
            <Link href={article.url}><a className={style.more}>More &rarr;</a></Link>
        </div>
    ))

    return (
        <div className={style.news}>
            {News}
        </div>
    )
}