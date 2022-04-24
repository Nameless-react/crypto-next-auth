const dev = process.env.NODE_ENV !== "production";
export default dev ? "http://localhost:3000" : process.env.VERCEL_URL;
// export default "https://startling-fairy-bf17eb.netlify.app"
// export default "http://localhost:3000"