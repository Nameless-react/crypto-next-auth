import Link from "next/link";

export default function Item (props) {
    return (
        <li className="SearchMatch" key={props.index + 1}> 
            <img src={props.image}/>
            <Link href={`/crypto/${props.id}`}>
                <a>{props.name} <span>{props?.symbol}</span></a>
            </Link>
        </li>
    )
}
