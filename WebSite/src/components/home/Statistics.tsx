import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import statistic from "../../assets/statistic.jpg";

export function Statistics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    const [counts, setCounts] = useState({ students: 0, partners: 0, countries: 0, immigrations: 0 });

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                setCounts((prev) => ({
                    students: Math.min(prev.students + 5, 820),
                    partners: Math.min(prev.partners + 1, 148),
                    countries: Math.min(prev.countries + 1, 80),
                    immigrations: Math.min(prev.immigrations + 20, 2487),
                }));
            }, 20);

            return () => clearInterval(interval);
        }
    }, [isInView]);

    return (
        <section
            className="w-full h-auto min-h-[450px] bg-cover bg-center bg-fixed text-white flex flex-col justify-center px-4 py-12"
            style={{ backgroundImage: `url('${statistic}')` }}
        >
            <div className="relative z-10 text-center" ref={ref}>
                <div className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Thousands Of People Choose Our Services
                </div>
                <hr className="border-t-4 border-red-500 w-2/3 mx-auto mb-6" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Happy Students", count: counts.students, delay: 0 },
                        { label: "University Partners", count: counts.partners, delay: 0.2 },
                        { label: "Countries", count: counts.countries, delay: 0.4 },
                        { label: "Immigrations", count: counts.immigrations, delay: 0.6 }
                    ].map(({ label, count, delay }, index) => (
                        <div key={index}>
                            <motion.div
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-500 mb-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay }}
                            >
                                {count} {label === "Happy Students" || label === "Countries" ? "+" : ""}
                            </motion.div>
                            <div className="text-base sm:text-lg">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
