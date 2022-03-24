import style from "../styles/Footer.module.css";
import { useRouter } from "next/router";
export default function Footer() {
    const { route } = useRouter();
    return (
        <footer className={ /watchlist|signin|cosas|login|profile/.test(route) ?  `${style.footer} ${style.watch}` : style.footer}>
                <h4>Copyright @ 2022 Joel Garcia. All rights reserved.</h4>
        </footer>
    )
}