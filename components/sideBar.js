"use client"
import style from "../styles/SideBar.module.css"
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import AutoComplete from "./AutoComplete";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SideBar(props) {
    // const {data:session, status} = useSession();
    const router = useRouter();

  

    return (
        <div className={style.sideBarContainer}>
            <nav className={props.show ?  style.sideBar : `${style.sideBar} ${style.sideBarOpen}`}>
            <VscChromeClose className="close" onClick={() => props.setShow(prevValue => !prevValue)}/>
                <ul className={style.sideBarList}>
                    {/* {!session && <li className={style.sign} onClick={() => props.setShow(false)}><Link href="/signup">Sign up</Link></li>} */}
                    {/* <li className={session ? style.profileNav: style.sign} onClick={() => props.setShow(false)}> */}
                        {/* {session ? <img className={style.profileImg} src={session?.user?.image} onClick={handleImg} alt=""/> : <Link href="/signin">Sign in</Link>} */}
                    {/* </li> */}
                    {/* <li> */}
                        {/* {session && <h3>{session?.user?.name}</h3>} */}
                    {/* </li> */}
                    <li>
                        <div className={style.containerSearch}>
                            <div className="instantSearch">
                                <AutoComplete/>
                            </div>
                        </div>
                    </li>
                    <li onClick={() => props.setShow(prevValue => !prevValue)}><Link href={"/"}>Home</Link></li>
                    <li onClick={() => props.setShow(prevValue => !prevValue)}><Link href={"/crypto"}>Crypto</Link></li>
                </ul>
            </nav>
        </div>
    )
}





