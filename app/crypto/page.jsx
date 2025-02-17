"use client"
import Coins from "../../components/coins";
import url from "../../config/index";
import style from "../../styles/Coin.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { faMagnifyingGlass, faStar, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Meta from "../../components/Head";
// import { useSession } from "next-auth/react";
import { useInfiniteQuery, QueryClient } from "@tanstack/react-query";
import useIntersection from "../../hooks/useIntersection";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/loader";
import { useSearchParams } from "next/navigation";


export default function Cryto() {
    const searchParams = useSearchParams();
    const [initialData, setInitialData] = useState([]);
    // const { data: session } = useSession();
    const [search, setSearch] = useState("");
    const { intersecting, UpArrowRef } = useIntersection()


    // if (!session) {

    // }

    useEffect(() => {
        const fetchPage = async () => {

            const page = searchParams.get("page") ? searchParams.get("page") : 1
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
            setInitialData(data.optimizeData || [])
            console.log(data || [])
        }

        fetchPage()
    }, [])


    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["cryptocurrencies"],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetch(`${url}/api/cryptocurrencies?page=${pageParam}`);
            return res.json();
        },
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage < lastPage.totalPage ? lastPage.nextPage : undefined;
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
    });




    if (isLoading) {
        return (
            <div>
                <Loader />;
            </div>
        )
    }


    console.log(data)

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
            {/* <Meta title="Crypto"/> */}
            <h2 ref={UpArrowRef} className={style.market}>Coin Market</h2>
            <div className={style.watchListContainer}>
                <Link href="/crypto/watchlist" className={style.watchList}><FontAwesomeIcon icon={faStar} /> WatchList</Link>
            </div>
            <div className={style.searchContainer}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input type="text" onChange={(e) => setSearch(e.target.value)} className={style.search} value={search} placeholder="Search" />
            </div>

            <div className={style.containerList}>
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
                <hr />
                <InfiniteScroll
                    className={style.list}
                    dataLength={getCoins.length}
                    hasMore={hasNextPage}
                    next={() => fetchNextPage()}
                    loader={<Loader />}
                >
                    {listCoin}
                </InfiniteScroll>
            </div>
            <div className={style.containerUpArrow}>
                <FontAwesomeIcon onClick={scrollToTop} icon={faAngleUp} className={intersecting ? `${style.arrowUpHide} ${style.arrowUp}` : style.arrowUp} />
            </div>
        </>
    )
};
