import { MongoClient } from "mongodb";

export default async function users (req, res) {
        if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })
        const { newName, oldName } = req.body;
        if (!newName) return res.status(400).json({ error: "Required username" });
        
        const client = await MongoClient.connect(process.env.MONGO_URI_CRYPTO);
        const db = client.db();
        const collection = await db.collection("users");
        const user = await collection.updateOne({ username: oldName }, {$set: { username: newName }});
        res.status(200).json({
            user
        });
}