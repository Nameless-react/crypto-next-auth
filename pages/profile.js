import { getSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faPenToSquare, faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/Coin.module.css"
import { useState, useRef } from "react";
import url from "../config/index";



export default function Profile({ session }) {
    const [editable, setEditable] = useState(false);
    const { user } = session
    const userRef = useRef(null)

    const saveChanges = async () => {
        console.log(userRef.current.textContent);
        console.log("gol")
        const request = await fetch(`${url}/api/users/update`, {
            method: "POST",
            body: JSON.stringify({ 
                newName: userRef.current.textContent,
                oldName: user.name }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const response = await request.json();
        console.log(response);
        setEditable(prevValue => !prevValue);
    }

    const handleCancelChanges = () => {
        userRef.current.textContent = user.name
        setEditable(prevValue => !prevValue)
    }

    return (
        <div className={style.profile}>
            <div className={style.username}>
                <h4 className={style.user} contentEditable={editable} ref={userRef}>{user.name}</h4>
                {editable ? <FontAwesomeIcon icon={faXmark}  onClick={handleCancelChanges} /> : <FontAwesomeIcon icon={faPenToSquare} onClick={() => setEditable(prevValue => !prevValue)} />}
                {editable && <FontAwesomeIcon icon={faFloppyDisk} onClick={saveChanges}/>}
            </div>
            <p className={style.email}>{user.email}</p>
            <img src={user.image} alt=""/>
            <a onClick={() => signOut({callbackUrl: `${url}/`})}>Sign out <FontAwesomeIcon icon={faArrowRightToBracket}/></a>
        </div>
    )
}


export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) return {
        redirect: {
            destination: "/",
            permanent: true
        },
    }

    return {
        props: {
            session
        }
    }
}


