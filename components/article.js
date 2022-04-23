import Link from "next/link"
import style from "../styles/Home.module.css"
import { useNearScreen } from "../pages/index";
import { useRef } from "react";

export default function Article(props) {
    const articleRef = useRef(null);
    const [articleShow] = useNearScreen(articleRef);

    return (
        <div ref={articleRef} className={`${style.article} artcile-${props.index + 1}`}>
            {articleShow ? <div>
                <h1 className={style.title}>{props.title}</h1>
                <p className={style.content}>{props.content}</p>
                <Link href="/article/[id]" as={`/article/${props.id}`}>
                    <a>More &rarr;</a>
                </Link>
            </div> : null}
        </div>
    )
}