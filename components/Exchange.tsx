import React, { JSX, useState, ChangeEvent } from "react";
import style from "../styles/Coin.module.css";
import { type Coin } from "../types/types"



export default function Convert({ coin }: { coin: Coin }): JSX.Element {
    const [price, setPrice] = useState(0);
    const [changingAmount, setChangingAmount] = useState(true)
    

    let toAmount: number, fromAmount: number
    if (changingAmount) {
      fromAmount = price
      toAmount = price / Number(coin.current_price)
    } else {
      toAmount = price
      fromAmount = price * Number(coin.current_price);
    }


    
    function handleFromAmountChange(event: ChangeEvent<HTMLInputElement>): void {
        setPrice(event.target.valueAsNumber)
        setChangingAmount(true)
    }
    
    function handleToAmountChange(event: ChangeEvent<HTMLInputElement>): void {
        setPrice(event.target.valueAsNumber)
        setChangingAmount(false)
    }
      

    return (
        <div className={style.exchange}>
           <div className={style.currency}>
                <label htmlFor="usd">USD</label>
                <input type="number" id="usd" onChange={(e) => handleFromAmountChange(e)} value={fromAmount} placeholder="0"/>
           </div>
            <div className={style.currency}>
                <label htmlFor="coin">{coin?.name}</label>
                <input type="number" id="coin" onChange={(e) => handleToAmountChange(e)} value={toAmount} placeholder="0"/>
            </div>
        </div>
    )
}