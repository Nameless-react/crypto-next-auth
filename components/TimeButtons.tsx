"use client"
import React, { JSX } from "react";
import style from "../styles/Coin.module.css";
import { type Time } from "../types/types";


interface Props {
    time: Time[],
    selection: any
}


export default function TimeButtons({ time, selection }: Props): JSX.Element {
    
    const buttons = time.map(day => {
        return <h3 className={`${style.day} ${day.selected ? style.selected : ""}`} onClick={() => selection(day.id)} key={day.id}>{day.tag}</h3>
    })
    
    return (
        <div className={style.containerTime}>
            {buttons}
        </div>
    )
}