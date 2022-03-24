import Head from "next/head";
export default function Meta(props) {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={props.keywords} />
            <meta name='description' content={props.description} />
            <meta charSet='utf-8' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
    )
};

Meta.defaultProps = {
    title: "Fetch Data",
    keywords: "API routes, get data, articles",
    description: "Little API",
};