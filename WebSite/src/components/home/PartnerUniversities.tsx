import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUniversity from "../../hooks/useUniversity";
import Loader from "../common/Loader";

const countries = [
    "All Countries",
    "Australia",
    "United States",
    "Canada",
    "United Kingdom",
    "Hungary",
    "France",
    "Saudi Arabia",
    "Spain",
];

// Animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8 }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, when: "beforeChildren" }
    }
};

export function PartnerUniversities() {
    const { universities, loading } = useUniversity()
    const [selectedCountry, setSelectedCountry] = useState("All Countries");
    const filteredUniversities = universities.filter(
        (uni) =>
            selectedCountry === "All Countries" || uni.country === selectedCountry,
    );

    if (loading) return <Loader />;

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-3xl text-midnight font-bold text-center mb-4">
                    Partner Institutes & Universities
                </div>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Our partner institutes and universities are committed to transforming lives through quality education.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {countries.map((country) => (
                        <motion.button
                            key={country}
                            onClick={() => setSelectedCountry(country)}
                            className={`px-4 py-2 rounded-full cursor-pointer ${selectedCountry === country ? "bg-red-500 text-white" : "text-gray-600 hover:text-gray-900"}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {country}
                        </motion.button>
                    ))}
                </div>
                <AnimatePresence>
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {filteredUniversities.map((university) => (
                            <motion.div
                                key={university.id}
                                className="p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                            >
                                <img
                                    src={`${import.meta.env.VITE_APICLIENT}/uploads/${university.logo}`}
                                    alt={university.name}
                                    className="w-full h-auto"
                                />
                                <p className="text-sm text-gray-600 text-center mt-2">
                                    {university.name}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}