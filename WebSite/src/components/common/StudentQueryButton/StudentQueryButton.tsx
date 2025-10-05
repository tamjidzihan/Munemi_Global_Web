import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentQueryButton = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = () => {
        navigate('/agentlogin')
    };

    return (
        <>
            <motion.button
                onClick={handleClick}
                className={`fixed flex items-center gap-2 cursor-pointer right-4 sm:right-10 bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-3 z-40 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${isScrolled ? "top-20 sm:top-24" : "top-42 sm:top-46"
                    }`}
                aria-label="Student Query"
                initial={{ right: -200, opacity: 0, scale: 0.8 }}
                animate={{ right: 30, opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                </motion.svg>
                <span className="text-sm sm:text-lg font-semibold">Student Enquiry</span>
            </motion.button>

        </>
    );
};

export default StudentQueryButton;