"use client"
import React from "react";
import Link from "next/link";
import style from "../styles/Coin.module.css";
import Image from "next/image";
import { type New } from "../types/types";


interface Props {
    news: New[]
}


export default function News({ news }: Props) {
    const News = news?.map((article, index) => (
        <div className={style.new} key={index + 1}>
            <h5>{article.title}</h5>
            <p className={style.author}>By: {article.author ? article.author : "Anonymus"}</p>
            <p>{article.description}</p>
            <Image src={article.urlToImage} alt="" />
            <Link href={article.url}><a className={style.more}>More &rarr;</a></Link>
        </div>
    ))

    return (
        <div className={style.news}>
            {News}
        </div>
    )
}