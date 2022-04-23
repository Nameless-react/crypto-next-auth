import { useRef, useState, useEffect } from "react";

export default function useIntersection() {
    const [intersecting, setIntersecting] = useState(true);
    const UpArrowRef = useRef(null); 

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(!entry.isIntersecting) {
                    setIntersecting(false)
                } else {
                    setIntersecting(true)
                }
            });
        })
        if (UpArrowRef.current) {
            observer.observe(UpArrowRef.current)
        }
        return () => {
            observer.disconnect()
        }
    }, [UpArrowRef.current])

    return { intersecting, UpArrowRef };
}
