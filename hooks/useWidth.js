import { useState, useEffect } from "react";

export default function useWidth() {
    const [width, setWidth] = useState(typeof window !== "undefined" && window.innerWidth);

    useEffect(() => {
        const resizeHandler = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
    }, [])

    return { width, setWidth };
}