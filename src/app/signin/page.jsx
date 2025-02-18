"use client"
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Error from "../../../components/error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "../../../styles/Coin.module.css";
import url from "../../../config/index";
import Link from "next/link";
import Image from "next/image";

export default function SignIn() {
    const router = useRouter();
    const [credencials, setCredencials] = useState({
        email: "",
        password: ""
    });
    const [eye, setEye] = useState(true);


    const handlerSubmit = async (e) => {
        e.preventDefault()

        if (credencials.email === "" || credencials.password === "") return <Error error="RequiredInputs" />  
        const status = await signIn("credentials", {
            redirect: false,
            email: credencials.email,
            password: credencials.password
        })

        setCredencials({
            email: "",
            password: ""
        })
        router.push("/")
    }

    const inputHandler = (e) => {
        const { name, value } = e.target
        return name === "password" ? setCredencials(prevValue => ({...prevValue, password: value})) : setCredencials(prevValue => ({...prevValue, email: value}))
    }

  return (
        <>
            <h3 className={style.signIn}>Sign in</h3>
            <form className={style.login} onSubmit={handlerSubmit}>
                <div className={style.credencials}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={inputHandler} value={credencials.email} required/>
                    <label htmlFor="password">Password:</label>
                    <div className={style.password}>
                        <input type={eye ? "password" : "text"} id="password" name="password" onChange={inputHandler} value={credencials.password}/>
                        {eye ? <FontAwesomeIcon icon={faEyeSlash} onClick={() => setEye(false)}/> : <FontAwesomeIcon icon={faEye} onClick={() => setEye(true)}/>}
                    </div>
                </div>
                <button className={style.btn} type="submit">Sign in</button>
                <hr className={style.continueWith}/>
                <div className={style.containerLoginWith}>
                    <div className={style.loginWith} onClick={() => signIn("github", {callbackUrl: `${url}/`})}>
                        {/* <Image src={gitHub.src} alt=""/>  */}
                        <Link href="#">Github</Link>
                    </div>
                    <div className={style.loginWith} onClick={() => signIn("discord", {callbackUrl: `${url}/`})}>
                        {/* <Image src={discord.src} alt=""/>  */}
                        <Link href="#">Discord</Link>
                    </div>
                </div>
            </form>
        </>
    )
}