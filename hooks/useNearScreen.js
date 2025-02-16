import { useState, useEffect } from "react";

export const useNearScreen = (externalRef) => {
    const [show, setShow] = useState(false);
    
    const options = {
       rootMargin: "100px"
    };
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShow(true)
            observer.disconnect()
          }
        }, [])
      }, options);
      observer.observe(externalRef.current)
      return () => observer.disconnect(externalRef.current)
    }, [])
    return [show, externalRef]
  }
  