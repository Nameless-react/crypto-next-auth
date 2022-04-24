const dev = process.env.NODE_ENV !== "production";
export default dev ? "http://localhost:3000" : "https://crypto-next-auth.vercel.app";
// export default "https://startling-fairy-bf17eb.netlify.app"
// export default "http://localhost:3000"