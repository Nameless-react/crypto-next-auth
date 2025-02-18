"use client"
import React, { JSX } from "react";
import url from "../../../../config/index";
import style from "../../../styles/Coin.module.css";
import { Line } from "react-chartjs-2";
import moment from "moment";
import News from "../../../../components/News";
import { Chart as ChartJS } from "chart.js/auto";
import Exchange from "../../../../components/Exchange";
import Time from "../../../../components/TimeButtons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import timeData from "../../../../config/timedata";
import Meta from "../../../../components/Head";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { type Coin, type CoinId } from "../../../../types/types";




export default function InfoCoin():JSX.Element {
    const params = useParams();
    const { id } = params;

    const [time, setTime] = useState(timeData);
    const [priceChange, setPriceChange] = useState([]);
    const [coin, setCoin] = useState<Coin>({ 
        current_price: 0, 
        name: "", 
        symbol: "",
        market_cap: 0,
        price_change_percentage_24h: 0,
        market_cap_rank: 0,
        id: "",
        image: ""
    })
    const [news, setNews] = useState([]);

    // const [watchList, setWatchList] = useState(localStorage.getItem(`${coin.name}`) ? true : false)


    // useEffect(() => {
    //     const fetching = async () => {
    //         const response = await fetch(`${url}api/cryptocurrencies/news?coin=cryptocurrencies`);
    //         const data = await response.json();
    //         setNews(data);
    //     };

    //     fetching()
    // }, [coin])


    useEffect(() => {
        const getPrice = async () => {
            const res = await fetch(`${url}api/cryptocurrencies/${id}?time=${time.filter(day => day.selected)[0].period}`);
            const data = await res.json()
            setPriceChange(data.prices)
        }

        getPrice()
    }, [time, id])


    const handleSelection = ({ id }: { id: CoinId }) => {
        setTime(prevValue => {
            return prevValue.map(day => day.id === id ? { ...day, selected: !day.selected } : { ...day, selected: false })
        })
    }


    const options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14
                    }
                }
            }
        },
        responsive: true,
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false
                }
            },
        },
    };

    const chart = {
        labels: priceChange?.map(data => {
            return moment(data[0]).format("LLL")
        }),
        datasets: [{
            label: "Price",
            data: priceChange?.map(data => data[1]),
            fill: false,
            borderColor: "#16C784",
            borderWidth: 2,
            pointRadius: 0.5,
            pointHoverRadius: 10,
            pointHitRadius: 50,
            pointHoverBackgroundColor: "#e00",
        }]
    };

    useEffect(() => {
        const fetchCoin = async () => {
            const coinRequest = await fetch(`${url}api/cryptocurrencies?id=${id}`)
            const coin = await coinRequest.json();
            setCoin(coin[0])
        }
        fetchCoin()
    }, [id])

    // useEffect(() => {
    //     watchList ? localStorage.setItem(`${coin.name}`, JSON.stringify(coin)) : localStorage.removeItem(`${coin.name}`)
    // }, [watchList])


    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div className="">
                <Meta title={coin?.name?.toUpperCase()} />
                <div className={style.info}>
                    <Image src={coin?.image || "defaultImage.jpg"} alt={String(coin?.name)} />
                    <h3 className={style.coin}>{coin?.name}</h3>
                    <h3>{coin?.symbol}</h3>
                    {/* <FontAwesomeIcon icon={faStar} className={watchList ? style.click : ""} onClick={() => setWatchList(preValue => !preValue)}/> */}
                    <h3>${Number(coin?.current_price)}</h3>
                    <h3 className={Number(coin?.price_change_percentage_24h) > 0 ? style.growthBg : style.lossesBg}>{Number(coin?.price_change_percentage_24h).toFixed(3)}%</h3>
                </div>
                <div className={style.chartContainer}>
                    <Time
                        time={time}
                        selection={handleSelection}
                    />
                    <Line data={chart} options={options} />
                </div>
                
                    <Exchange
                        coin={coin}
                    />
                
                <h5 className={style.NewsSection}>News</h5>
                {/* <News news={news} /> */}
            </div>
        </Suspense>
    )
}