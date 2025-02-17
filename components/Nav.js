"use client"
import Image from "next/image";
import Link from "next/link"
import style from "../styles/Nav.module.css";
import { useSession } from 'next-auth/react';
// import AutoComplete from "./AutoComplete";
import { useRouter } from "next/navigation";

export default function Nav() {
    const {data: session} = useSession();
    const router = useRouter();

    return (
    <header className={style.header}>
        <nav>
            <ul className={style.NavBar}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/crypto">Crypto</Link></li>
                <li className="instantSearch">
                    {/* <AutoComplete /> */}
                </li>
                {!session && <li><Link href="/signup">Sign up</Link></li>}
                <li className={style.profileNav}>
                    {session ? <Image className={style.profileImg} src={session?.user?.image} onClick={() => router.push("/profile")} alt=""/> : <Link href="/signin">Sign in</Link>}
                </li>
            </ul>
        </nav>
    </header>
    )
}