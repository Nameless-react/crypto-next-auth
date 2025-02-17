"use client"
import url from "../../../config/index";
import style from "../../../styles/Coin.module.css";
import { Line } from "react-chartjs-2";
import moment from "moment";
import News from "../../../components/news";
import { Chart as ChartJS } from "chart.js/auto";
import Exchange from "../../../components/exchange";
import Time from "../../../components/time";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import timeData from "../../../config/timedata";
import Meta from "../../../components/Head";
import { useParams } from "next/navigation";


export default function InfoCoin() {
   const params = useParams();
   const { id } = params; 
    
    const [time, setTime] = useState(timeData);
    const [priceChange, setPriceChange] = useState([]);
    const [coin, setCoin] = useState({})
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
            console.log(data.prices)
            setPriceChange(data.prices)
        } 
        
        getPrice()
    }, [time])
    
    
    const handleSelection = (id) => {
        setTime(prevValue => {
            return prevValue.map(day => day.id === id ? {...day, selected: !day.selected} : {...day, selected: false})
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
    }, [])
    
    // useEffect(() => {
    //     watchList ? localStorage.setItem(`${coin.name}`, JSON.stringify(coin)) : localStorage.removeItem(`${coin.name}`)
    // }, [watchList])
    

    return (
        <> 
        <Meta title={coin?.name?.toUpperCase()} />
        <div className={style.info}>
            <img src={coin?.image} alt={coin?.name} />
            <h3 className={style.coin}>{coin?.name}</h3>
            <h3>{coin?.symbol}</h3>
            {/* <FontAwesomeIcon icon={faStar} className={watchList ? style.click : ""} onClick={() => setWatchList(preValue => !preValue)}/> */}
            <h3>${coin.current_price}</h3>
            <h3 className={coin?.price_change_percentage_24h > 0 ? style.growthBg : style.lossesBg}>{coin?.price_change_percentage_24h?.toFixed(2) === 0 ? coin?.price_change_percentage_24h?.toFixed(3) : coin?.price_change_percentage_24h?.toFixed(2)}%</h3>
        </div>
        <div className={style.chartContainer}>
            <Time
                time={time}
                selection={handleSelection} 
            />
            <Line data={chart} options={options}/>
        </div>
        <Exchange 
            id={id}
            coin={coin}
        />
        <h5 className={style.NewsSection}>News</h5>
        {/* <News news={news} /> */}
        </>
    )
}