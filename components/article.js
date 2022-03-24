import Link from "next/link"
import style from "../styles/Home.module.css"
export default function Article(props) {
    return (
        <div className={style.article}>
            <h1 className={style.title}>{props.title}</h1>
            <p className={style.content}>{props.content}</p>
            <Link href="/article/[id]" as={`/article/${props.id}`}>
                <a>More &rarr;</a>
            </Link>
        </div>
    )
}