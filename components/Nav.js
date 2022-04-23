import Link from "next/link"
import Head from "next/head"
import style from "../styles/Nav.module.css";
import { useSession } from 'next-auth/react';
import AutoComplete from "./AutoComplete";
import { useRouter } from "next/router";

export default function Nav(props) {
    const {data:session, status} = useSession();
    const router = useRouter();

    return (
    <header className={style.header}>
        <Head>
        <title>Create Next App</title>
        </Head>
        <nav>
            <ul className={style.NavBar}>
                <li><Link href="/cosas">Cosas</Link></li>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/crypto">Crypto</Link></li>
                <div className="instantSearch">
                    <AutoComplete />
                </div>
                {!session && <li><Link href="/signup">Sign up</Link></li>}
                <li className={style.profileNav}>
                    {session ? <img className={style.profileImg} src={session?.user?.image} onClick={() => router.push("/profile")} alt=""/> : <Link href="/signin">Sign in</Link>}
                </li>
            </ul>
        </nav>
    </header>
    )
}


// ${session?.user?.image ? "" : style.none}