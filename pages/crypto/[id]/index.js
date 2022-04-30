import url from "../../../config/index";
import style from "../../../styles/Coin.module.css";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/router";
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

export default function InfoCoin (props) {
    const router = useRouter()
    const { id }  = router.query
    const { price_change_percentage_24h, name } = props.coin; 
    
    const [time, setTime] = useState(timeData);
    const [priceChange, setPriceChange] = useState([]);
    const [news, setNews] = useState([]);
    
    const isServer = typeof window !== "undefined";
    const [watchList, setWatchList] = useState(isServer && localStorage.getItem(`${props.coin.name}`) ? true : false)


    useEffect(() => {
       const fetching = async () => {
            const response = await fetch(`${url}api/cryptocurrencies/news?coin=cryptocurrencies`);
            const data = await response.json();
            setNews(data);
       };

       fetching()
    }, [props.coin])

    
    useEffect(() => {
        const getPrice = async () => {
            const res = await fetch(`${url}api/cryptocurrencies/${id}?time=${time.filter(day => day.selected)[0].period}`);
            const data = await res.json()
            setPriceChange(data)
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
        const watch = watchList ? localStorage.setItem(`${props.coin.name}`, JSON.stringify(props.coin)) : localStorage.removeItem(`${props.coin.name}`)
    }, [watchList])
    
    return (
        <> 
        <Meta title={name.toUpperCase()} />
        <div className={style.info}>
            <img src={props.coin.image} alt={props.coin.name} />
            <h3 className={style.coin}>{props.coin.name}</h3>
            <h3>{props.coin.symbol}</h3>
            <FontAwesomeIcon icon={faStar} className={watchList ? style.click : ""} onClick={() => setWatchList(preValue => !preValue)}/>
            <h3>${props.coin.current_price}</h3>
            <h3 className={price_change_percentage_24h > 0 ? style.growthBg : style.lossesBg}>{price_change_percentage_24h.toFixed(2) === 0 ? price_change_percentage_24h.toFixed(3) : price_change_percentage_24h.toFixed(2)}%</h3>
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
            coin={props.coin}
        />
        <h5 className={style.NewsSection}>News</h5>
        <News news={news} />
        </>
    )
}


export const getServerSideProps = async (context) => {
    const coinRequest = await fetch(`${url}api/cryptocurrencies?id=${context.params.id}`)
    const coin = await coinRequest.json();
    return {
        props: {
            coin: coin[0]
        }
    }
};
