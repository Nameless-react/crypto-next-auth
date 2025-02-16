export default async function coins (req, res) {
    const { coin } = req.query;
    const response = await fetch(`https://newsapi.org/v2/everything?q=${coin}&apiKey=92593c55645e4399bdbc44205749b293&language=en`);
    const data = await response.json();
    if(data) {
        const news = [];
        for (let i = 0; i < 3; i++) {
            news.push(data.articles[Math.ceil(Math.random() * data.articles.length - 1)])
        }
        res.status(200).json(news);
    } else {
        res.status(404).json({
            response: "Connection failed"
        })
    }
}
