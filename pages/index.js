import Meta from '../components/Head';
import style from '../styles/Home.module.css';
import Article from '../components/article';
import url from "../config/index";
import { useEffect } from 'react';
import { useState } from 'react';

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
  
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  // const res = await fetch(`${url}/api/articles`);
  const article = await res.json();
  return {
    props: {
      article
    }
  }
}






export const useNearScreen = (externalRef) => {
  const [show, setShow] = useState(false);
  
  const options = {
     rootMargin: "100px"
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShow(true)
          observer.disconnect()
        }
      }, [])
    }, options);
    observer.observe(externalRef.current)
    return () => observer.disconnect(externalRef.current)
  }, [])
  return [show, externalRef]
}
