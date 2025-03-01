import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed cursor-pointer bottom-10 right-10 hover:bg-red-700 bg-red-500 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                } hidden md:block`}
            aria-label="Scroll to top"
        >
            <ArrowUp size={24} />
        </button>
    );
};

export default ScrollToTopButton;
