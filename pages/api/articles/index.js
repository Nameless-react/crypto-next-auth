export default async function handler(req, res) { 
    const rest = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await rest.json()

    if(data) {
        res.status(200).json(data)
    } else {
        res.status(404).json({
            response: "Error"
        })
    }
}