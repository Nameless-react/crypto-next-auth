import { getProviders, getSession, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/Coin.module.css"
import url from "../config/index";


export default function Profile({ session }) {
    const { user } = session
    
    return (
        <div className={style.profile}>
            <h4 className={style.user}>{user.name}</h4>
            <p className={style.email}>{user.email}</p>
            <img src={user.image}/>
            <a onClick={() => signOut({callbackUrl: `${url}/`})}>Sign out <FontAwesomeIcon icon={faArrowRightToBracket}/></a>
        </div>
    )
}


export const getServerSideProps = async (context) => {
    console.log(context)
    const session = await getSession(context);

    return {
        props: {
            session
        }
    }
}


