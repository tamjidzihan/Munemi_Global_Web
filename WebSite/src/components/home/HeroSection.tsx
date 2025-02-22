import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import slide1 from "../../assets/slide-1.jpg"
import slide2 from "../../assets/slide-2.jpg"
import slide3 from "../../assets/slide-3.jpg"
import slide4 from "../../assets/slide-4.jpg"
import { Link } from "react-router-dom";

const slides = [
    {
        image: slide1,
        title: "IMMIGRATION & VISA CONSULTATION",
        description: "Navigate the complexities of immigration and visa applications with expert guidance. Our professional consultants provide step-by-step support to ensure a smooth and successful process.",
        button: "Get Expert Guidance"
    },
    {
        image: slide2,
        title: "WORK ABROAD WITH EASE",
        description: "Turn your dream of working overseas into reality with our comprehensive visa consultation services. We help individuals and families secure work permits and visas hassle-free.",
        button: "Start Your Journey"
    },
    {
        image: slide3,
        title: "EXPLORE NEW OPPORTUNITIES",
        description: "Unlock a world of possibilities with personalized immigration assistance. Whether you're seeking better job prospects or a fresh start abroad, we’re here to guide you every step of the way.",
        button: "Discover Opportunities"
    },
    {
        image: slide4,
        title: "SECURE YOUR FUTURE ABROAD",
        description: "Plan your future with confidence by working with our trusted immigration specialists. From visa applications to relocation advice, we provide all the support you need for a seamless transition.",
        button: "Plan Your Future"
    },
];



const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <section className="relative h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
            <AnimatePresence>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: .5 }}
                    >
                        <p className="text-2xl mb-4">We have 20+ years experience in</p>
                        <h1 className="text-7xl font-bold mb-6">{slides[currentIndex].title}</h1>
                        <p className="text-lg mb-8">{slides[currentIndex].description}</p>
                        <Link to={'/'}>
                            <button className="px-4 py-2  text-white hover:border hover:border-white bg-red-500 hover:bg-transparent transition duration-300 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg text-center">
                                {slides[currentIndex].button}
                            </button>
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows (Moved to Bottom) */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button onClick={prevSlide}>
                    <HiArrowLongLeft size={50} className="text-red-500 hover:text-red-200 transition duration-200 cursor-pointer" />
                </button>
                <button onClick={nextSlide}>
                    <HiArrowLongRight size={50} className="text-red-500 hover:text-red-200 transition duration-200 cursor-pointer" />
                </button>
            </div>
        </section>
    );
};

export default HeroCarousel;
