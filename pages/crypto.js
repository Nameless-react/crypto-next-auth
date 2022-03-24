import Coins from "../components/coins";
import url from "../config/index";
import style from "../styles/Coin.module.css";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { faMagnifyingGlass, faStar, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Meta from "../components/Head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Cryto(props) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [intersecting, setIntersecting] = useState(true);
    const UpArrow = useRef(null); 
    const [page, setPage] = useState(2);

    if (props.data.response === "Unauthorized user") {
        return <h3>Can not process the request</h3>
    }

    useEffect(() => {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(!entry.isIntersecting) {
                    setIntersecting(false)
                } else {
                    setIntersecting(true)
                }
            });
        })
        observer.observe(UpArrow.current)
        return () => {
            observer.disconnect()
        }
    }, [])



    const searchCoin = props.data.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()))

    const listCoin = searchCoin.map(coin =>  
                                        <Coins
                                            {...coin}
                                            key={coin.id}
                                        />);


    return (
        <> 
            <Meta title="Crypto"/>
            <h2 ref={UpArrow} className={style.market}>Coin Market</h2>
            <div className={style.watchListContainer}>
                <Link href="/crypto/watchlist"><a className={style.watchList}><FontAwesomeIcon icon={faStar} /> WatchList</a></Link>
            </div>
            <div className={style.searchContainer}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                <input type="text" onChange={(e) => setSearch(e.target.value)} className={style.search} value={search} placeholder="Search"/>
            </div>
            <div className={style.stats}>
                <Coins
                    key="tags"
                    name="Coin"
                    market_cap="Market Cap."
                    current_price="Price"
                    price_change_percentage_24h="24h"
                    market_cap_rank="#"
                />
            </div>
            <hr/>
            <div className={style.list}>
                {listCoin}
            </div>
            <div className={style.changePage}>
                <Link href={`${url}/crypto?page=${page}`}><a onClick={() => setPage(prevValue => prevValue === 1 ? prevValue : prevValue - 1)}>&larr;</a></Link>
                {page >= 3 && <Link href={`${url}/crypto?page=1`}><a className={style.pageOne} onClick={() => setPage(2)}>1</a></Link>}
                <Link href={`${url}/crypto?page=${page - 1}`}><a className={style.currentPage}>{page - 1}</a></Link>
                <Link href={`${url}/crypto?page=${(page - 1) * 10}`}><a className={style.pageNumber} onClick={() => setPage(prevValue => (prevValue - 1) * 10)}>{(page - 1) * 10}</a></Link>
                <Link href={`${url}/crypto?page=${page}`}><a onClick={() => setPage(prevValue => prevValue + 1)}>&rarr;</a></Link>
            </div>
            <div className={style.containerUpArrow}>
                <FontAwesomeIcon onClick={() => router.push(`/crypto?page=${page}`)} icon={faAngleUp} className={intersecting ? `${style.arrowUpHide} ${style.arrowUp}` : style.arrowUp}/>
            </div>
        </>
    )
};



export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) return {
        redirect: {
            destination: "/auth/signin",
            permanent: false
        }
    }
    const page = context.query.page ? context.query.page : 1
    const res = await fetch(`${url}/api/cryptocurrencies?page=${page}`);
    const data = await res.json();
    return {
        props: {
            data,
            session
        }
    }
}