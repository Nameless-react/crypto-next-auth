"use client"
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faPenToSquare, faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "../../../styles/Coin.module.css"
import { useState, useRef } from "react";
import url from "../../../config/index";
import Image from "next/image";


export default function Profile() {
    const [editable, setEditable] = useState(false);
    const userRef = useRef(null)
    const { data: session } = useSession()



    return (
        <div className={style.profile}>
            <div className={style.username}>
                <h4 className={style.user} contentEditable={editable} ref={userRef}>{session?.user?.name}</h4>
                {editable && <FontAwesomeIcon icon={faFloppyDisk}/>}
            </div>
            <p className={style.email}>{session?.user?.email}</p>
            <Image src={session?.user?.image} alt=""/>
            <a onClick={() => signOut({callbackUrl: `${url}/`})}>Sign out <FontAwesomeIcon icon={faArrowRightToBracket}/></a>
        </div>
    )
}