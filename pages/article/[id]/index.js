import { useRouter } from "next/router"
import style from "../../../styles/Home.module.css"
import url from "../../../config/index";
import Meta from "../../../components/Head";

export default function Article(props) {
    const router = useRouter()
    const {id}  = router.query
    return (
        <>
            <Meta  title={props.article.title}/>
            <h1 className={style.id}>{props.article.body ? `This is the article ${id}` : "Article not found"}</h1>
            <p className={style.content}>{props.article.body}</p>
        </>
    )
}

const isJson = async text => {
    try {
        JSON.parse(text);            
    } catch (error) {
        return false
    }
    return true
}


export const getStaticProps = async (context) => {
    const res = await fetch(`${url}/api/articles/${context.params.id}`);

    const isJsonText = await isJson(res.body)
    // console.log(JSON.parse(res.text()))
    console.log(typeof await res.json())
    if (isJsonText) {
        const article = await res.json();
        return {
            props: {
                article
            }
        }
    }

    return {
        props: {
            article: "none"
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${url}/api/articles`);
    const article = await res.json();
    const ids = article.map(article => article.id)
    const paths = ids.map(id => ({
        params: {
            id: id.toString()
        }
    })
    );
    return {
        paths,
        fallback: false
    }
}