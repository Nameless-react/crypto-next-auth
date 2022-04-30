const dev = process.env.NODE_ENV !== "production";
export default dev ? "http://localhost:3000/" : "https://crypto-next-auth-1.vercel.app/";