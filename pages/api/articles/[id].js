import url from '../../../config/index';
export default async function handler(req, res) {
    const rest = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await rest.json(); 
    const { id } = req.query;
    const filtered = data.filter(element => element.id === parseInt(id));
    if (filtered.length > 0) {
        res.status(200).json(filtered[0]); 
    } else {
        res.status(404).json({
            response: `Element with the id ${id} not match`
        })
    }
}