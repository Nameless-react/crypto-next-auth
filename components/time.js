import style from "../styles/Coin.module.css";
export default function TimeButtons(props) {
    
    const buttons = props.time.map(day => {
        return <h3 className={`${style.day} ${day.selected ? style.selected : ""}`} onClick={() => props.selection(day.id)} key={day.id}>{day.tag}</h3>
    })
    
    return (
        <div className={style.containerTime}>
            {buttons}
        </div>
    )
}