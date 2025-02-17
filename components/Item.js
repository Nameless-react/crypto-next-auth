import Image from "next/image";
import Link from "next/link";


export default function Item (props) {
    return (
        <li className="SearchMatch" key={props.index + 1}> 
            <Image src={props.image} alt=""/>
            <Link href={`/crypto/${props.id}`}>
                <Link>{props.name} <span>{props?.symbol}</span></Link>
            </Link>
        </li>
    )
}
