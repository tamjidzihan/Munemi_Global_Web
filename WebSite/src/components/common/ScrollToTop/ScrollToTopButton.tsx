import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed cursor-pointer bottom-8 right-8 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl backdrop-blur-sm border border-white/20 hidden md:flex items-center justify-center z-50"
                    aria-label="Scroll to top"
                    initial={{ scale: 0, opacity: 0, y: 100 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: 100 }}
                    whileHover={{
                        scale: 1.1,
                        y: -2,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }}
                >
                    <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <ArrowUp size={22} className="filter drop-shadow-sm" />
                    </motion.div>

                    {/* Optional: Subtle pulse effect */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-white/30"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTopButton;