import Meta from '../components/Head';
import style from '../styles/Home.module.css';
import Article from '../components/article';


export default function Home(props) {
  const articles = props.article.map((article, index) => {
    return <Article 
    index={index}
    title={article.title}
    key={article.id}
    id={article.id}
    content={article.body}
    />
  });
  
  return (
    <>
      <Meta />
      <div className={style.containerArticles}>
        {articles}
      </div>
    </>
  )
};


export const getStaticProps = async (context) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const article = await res.json();
  return {
    props: {
      article
    }
  }
}
