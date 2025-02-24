import { motion } from "framer-motion";
import consultant from "../../assets/consultent.png";

export function ConsultantFinder() {
    return (
        <section className="py-16 px-4 bg-white w-full">
            <div className="max-w-7xl mx-auto">
                {/* Title Animation */}
                <motion.h2
                    className="text-3xl sm:text-4xl font-medium text-center mb-4 text-midnight"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Find a consultant by:
                </motion.h2>

                {/* Description Animation */}
                <motion.p
                    className="text-gray-500 text-center mb-10 sm:mb-16 max-w-2xl mx-auto text-base sm:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Cursus porta, feugiat primis in ultrice ligula risus auctor tempus
                    dolor feugiat, felis lacinia risus interdum auctor id viverra dolor
                    iaculis luctus placerat and massa
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 items-center">
                    {/* Country List Animation */}
                    <motion.div
                        className="text-center md:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-midnight text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Country:</h3>
                        <ul className="space-y-3">
                            {["Canada", "Australia", "United Kingdom", "USA", "New Zealand", "South Korea"].map((country) => (
                                <motion.li
                                    key={country}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                                        {country}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <a href="#" className="text-midnight font-bold hover:text-blue-800 mt-4 sm:mt-6 inline-block ">
                            View All
                        </a>
                    </motion.div>

                    {/* Practice Area List Animation */}
                    <motion.div
                        className="text-center md:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-midnight text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Practice Area:</h3>
                        <ul className="space-y-3">
                            {[
                                "Student Visa",
                                "Skilled Work Visa",
                                "Business visa",
                                "Spouse/Family Visa",
                                "Tourist & Visitor Visa",
                                "Immigration Consult",
                            ].map((area) => (
                                <motion.li
                                    key={area}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                                        {area}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <a href="#" className="text-midnight font-bold hover:text-blue-800 mt-4 sm:mt-6 inline-block ">
                            View All
                        </a>
                    </motion.div>

                    {/* Image Animation */}
                    <motion.div
                        className="lg:col-span-3 place-self-center flex justify-center md:justify-end"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={consultant}
                            alt="World Map showing consultant locations"
                            className="max-w-[80%] sm:max-w-full h-auto"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
