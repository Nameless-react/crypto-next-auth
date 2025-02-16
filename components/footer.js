"use client"
import style from "../styles/Footer.module.css";
import { useRouter } from "next/navigation";
export default function Footer() {
    const router = useRouter();
    return (
        <footer className={ /watchlist|signin|signup|cosas|login|profile/.test(router) ?  `${style.footer} ${style.watch}` : style.footer}>
                <h4>Copyright @ 2022 Joel Garcia. All rights reserved.</h4>
        </footer>
    )
}