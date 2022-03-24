import { useState } from "react";
import style from "../styles/Coin.module.css";
export default function Convert(props) {
    const [price, setPrice] = useState(0);
    const [changingAmount, setChangingAmount] = useState(true)
    

    let toAmount, fromAmount
    if (changingAmount) {
      fromAmount = price
      toAmount = price / props.coin?.current_price
    } else {
      toAmount = price
      fromAmount = price * props.coin?.current_price;
    }


    
    function handleFromAmountChange(e) {
        setPrice(e.target.valueAsNumber)
        setChangingAmount(true)
    }
    
    function handleToAmountChange(e) {
        setPrice(e.target.valueAsNumber)
        setChangingAmount(false)
    }
      

    return (
        <div className={style.exchange}>
           <div className={style.currency}>
                <label htmlFor="usd">USD</label>
                <input type="number" id="usd" onChange={(e) => handleFromAmountChange(e)} value={fromAmount} placeholder="0"/>
           </div>
            <div className={style.currency}>
                <label htmlFor="coin">{props.coin?.name}</label>
                <input type="number" id="coin" onChange={(e) => handleToAmountChange(e)} value={toAmount} placeholder="0"/>
            </div>
        </div>
    )
}