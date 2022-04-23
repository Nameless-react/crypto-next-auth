import Coins from "../components/coins";
import url from "../config/index";
import style from "../styles/Coin.module.css";
import { useState } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { faMagnifyingGlass, faStar, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Meta from "../components/Head";
import { getSession } from "next-auth/react";
import { useInfiniteQuery, QueryClient } from "react-query";
import useIntersection from "../hooks/useIntersection";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/loader";

export default function Cryto(props) {
    const [search, setSearch] = useState("");
    const { intersecting, UpArrowRef } = useIntersection()

    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
     "crypto",
      async ({ pageParam = 1 }) => {
        const res = await fetch(`${url}/api/cryptocurrencies?page=${pageParam}`);
        return await res.json();
    },
    {
        getNextPageParam: (lastPage) => {
            if (lastPage.nextPage < lastPage.totalPage) return lastPage.nextPage;
            return undefined;
        },
            refetchOnWindowFocus: false,
            initialData: props.data,
        },
    )  
    


    
    if (isLoading || !data.pages) {
        return <Loader />;
    }
    
    const getCoins = data?.pages?.reduce((prevValues, values) => prevValues.concat(values.optimizeData), []) ?? [];
    const searchCoin = [...new Set(getCoins?.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())))]
    const listCoin = searchCoin?.map(coin =>  
                                        <Coins
                                            {...coin}
                                            key={coin.market_cap_rank}
                                        />);




    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
        };

    return (
        <> 
            <Meta title="Crypto"/>
            <h2 ref={UpArrowRef} className={style.market}>Coin Market</h2>
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
            <InfiniteScroll
                className={style.list}
                dataLength={getCoins.length}
                hasMore={hasNextPage}
                next={() => fetchNextPage()}
                loader={<Loader />}
            >
                {listCoin}
            </InfiniteScroll>
            <div className={style.containerUpArrow}>
                <FontAwesomeIcon onClick={scrollToTop} icon={faAngleUp} className={intersecting ? `${style.arrowUpHide} ${style.arrowUp}` : style.arrowUp}/>
            </div>
        </>
    )
};





export const getServerSideProps = async (context) => {
    //JWT Authorization and next-auth
    const session = await getSession(context);
    console.log(session)
    if (!session) return {
        redirect: {
            destination: "/cosas",
            permanent: false
        }
    }



    //Reac Query
    const page = context.query.page ? context.query.page : 1
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(
        "crypto",
        async () => {
            const res = await fetch(`${url}/api/cryptocurrencies?page=${page}`)
            return await res.json()
        }
        )
        
    const res = await fetch(`${url}/api/cryptocurrencies?page=${page}`)
    const data = await res.json()

    return {
        props: {
            session,
            data
        }
    }   
}