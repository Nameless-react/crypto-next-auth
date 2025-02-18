import bcrypt from "bcrypt"; 
import { MongoClient } from "mongodb";

export default async function users (req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })
    const { email, password, username } = req.body;
    if (!email || !password || !username) return res.status(400).json({ error: "Required inputs" });

    const client = await MongoClient.connect(process.env.MONGO_URI_CRYPTO);
    const db = client.db();

    const checkExisting = await db.collection("users").findOne({ email });
    if (checkExisting) {
        res.status(422).json({ error: "Email already exists" });
        client.close();
        return;
    }
    
    const newUser = await db.collection("users").insertOne({
        username,
        email,
        password: await bcrypt.hash(password, 10),
        verifyUser: false,
    }); 

    res.status(200).json({
        message: "User created"
    });
    client.close();
}


