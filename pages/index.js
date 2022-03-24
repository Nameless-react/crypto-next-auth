import Meta from '../components/Head';
import style from '../styles/Home.module.css';
import Article from '../components/article';
import url from "../config/index";

export default function Home(props) {
  const articles = props.articles.map(article => {
    return <Article 
    title={article.title}
    key={article.id}
    id={article.id}
    content={article.body}
  />
  });

  return (
    <div className="container">
      <Meta />
      <div className={style.containerArticles}>
        {articles}
      </div>
    </div>
  )
};


export const getStaticProps = async () => {
  const res = await fetch(`${url}/api/articles`);
  const articles = await res.json();
  return {
    props: {
      articles
    }
  }
}
