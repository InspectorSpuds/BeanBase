import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const[dimensions,setDimensions] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    function handleResize() {
      setDimensions(old => [window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}