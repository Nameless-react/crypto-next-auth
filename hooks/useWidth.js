"use client"
import { useState, useEffect } from "react";

export default function useWidth() {
    const isServer = typeof window !== "undefined";
    const [width, setWidth] = useState(isServer ? window.innerWidth : undefined);

    useEffect(() => {
        const resizeHandler = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
    }, [])

    return { width, setWidth };
};