import React, { useEffect } from 'react'
import { ArrowUp } from "lucide-react"
import { useLocation } from 'react-router-dom'

export function PageScroll() {

    const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-6 md:left-12 bg-blue-600 rounded-full p-3 text-white hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
    </button>
)
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}  
