import { useSession, signIn, getSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Error from "../../components/error";
import { useRouter } from "next/router";
import { useState } from "react";
import style from "../../styles/Coin.module.css"
import url from "../../config/index";
import gitHub from "../../public/github-brands.svg"
import discord from "../../public/discord-brands.svg"

export default function SignIn(props) {
    const router = useRouter();
    const { error } = router.query
    const [credencials, setCredencials] = useState({
        email: "",
        password: ""
    });
    const [eye, setEye] = useState(true);
    const handlerSubmit = (e) => {
        e.preventDefault()
        setCredencials({
            email: "",
            password: ""
        })
        router.push("/cosas")
    }

    const inputHandler = (e) => {
        const { name, value } = e.target
        return name === "password" ? setCredencials(prevValue => ({...prevValue, password: value})) : setCredencials(prevValue => ({...prevValue, email: value}))
    }



  return (
        <> 
            {error && <Error error={error} />}
            <h3 className={style.signIn}>Sign in with</h3>
            <form className={style.login} onSubmit={handlerSubmit}>
                <div className={style.credencials}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={inputHandler} value={credencials.email}/>
                    <label htmlFor="password">Password:</label>
                    <div className={style.password}>
                        <input type={eye ? "password" : "text"} id="password" name="password" onChange={inputHandler} value={credencials.password}/>
                        {eye ? <FontAwesomeIcon icon={faEyeSlash} onClick={() => setEye(false)}/> : <FontAwesomeIcon icon={faEye} onClick={() => setEye(true)}/>}
                    </div>
                </div>
                <button className={style.btn} onClick={() => signIn("email", { email })}>Sign in</button>
                <hr className={style.continueWith}/>
                <div className={style.containerLoginWith}>
                    <div className={style.loginWith} onClick={() => signIn("github", {callbackUrl: `${url}/`})}>
                        <img src={gitHub.src}/> 
                        <a>Github</a>
                    </div>
                    <div className={style.loginWith} onClick={() => signIn("discord", {callbackUrl: `${url}/`})}>
                        <img src={discord.src}/> 
                        <a>Discord</a>
                    </div>
                </div>
            </form>
        </>
    )
}


export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (session) return {
        redirect: {
            destination: "/",
            permanent: true
        }
    }

    return {
        props: {
            session
        }
    }
} 