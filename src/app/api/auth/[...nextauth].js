import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../libs/mongodb";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET,
        }),
        CredentialsProvider({
            async authorize(credencials) {
                const client = await MongoClient.connect(process.env.MONGO_URI_CRYPTO);
                const db = client.db();

                const userCollection = await db.collection("users")
                const user = await userCollection.findOne({ email: credencials.email });


                if (!user) {
                    client.close();
                    throw new Error("Something went wrong");
                }
                
                const checkpassword = await bcrypt.compare(credencials.password, user.password);

                if(!checkpassword) {
                    client.close();
                    throw new Error("Something went wrong");
                }
                const { password, image, username: name, ...rest } = user;
                if (!image) {
                    const newImage = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg";
                    return { ...rest, name, image: newImage };
                }

                return { ...rest, name, image };
                client.close();
            }
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token.id = user._id
            return token
        },
        session: async  ({session, token, user }) => {
            session.accessToken = token.accessToken
            return session
        }
    },
    secret: process.env.SECRET_JWT,
    jwt: {
        secret: process.env.SECRET_JWT,
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 14,
    },
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: "/signin",
    }
})