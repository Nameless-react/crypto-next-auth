import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET,
        })

    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin"
    },
})