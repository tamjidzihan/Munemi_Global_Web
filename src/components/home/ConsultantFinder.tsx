import { motion } from "framer-motion";
import consultant from "../../assets/consultent.png";
import { Link } from "react-router-dom";


const countries = [
    { label: "Australia", link: "/study-destination/australia" },
    { label: "United States", link: "/study-destination/unitedstates" },
    { label: "Canada", link: "/study-destination/canada" },
    { label: "United Kingdom", link: "/study-destination/unitedkingdom" },
    { label: "Hungary", link: "/study-destination/newzealand" },
    { label: "France", link: "/study-destination/uae" },
    { label: "Saudi Arabia", link: "/study-destination/malaysia" },
    { label: "Spain", link: "/study-destination/malta" }
]


const visaServices = [
    { label: "Student Visa", link: "/services/student-visa" },
    { label: "Partner Visa", link: "/services/partner-visa" },
    { label: "Visitor Visa", link: "/services/visitor-visa" },
    { label: "Migration Services", link: "/services/migration-services" },
    { label: "Other Type Visa", link: "/services/other-type-visa" },
    { label: "Skilled/Work Visa", link: "/services/skilled-migrant-visa" },
    { label: "Family/Parent Visa", link: "/services/family-parent-visa" },
    { label: "Permanent Residency", link: "/services/permanent-residency" },
]

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
                    Our consultants provide expert guidance, ensuring a smooth and stress-free immigration process with personalized support tailored to your needs.
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
                            {countries.map((country) => (
                                <motion.li
                                    key={country.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <Link to={`/study-destination/${country.label.split(' ').join('').toLocaleLowerCase()}`} className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                                        {country.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                        <Link to={'/study-destination'} className="text-midnight font-bold hover:text-blue-800 mt-4 sm:mt-6 inline-block ">
                            View All
                        </Link>
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
                            {visaServices.map((area) => (
                                <motion.li
                                    key={area.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <Link to={area.link} className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                                        {area.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                        <Link to={'/services'} className="text-midnight font-bold hover:text-blue-800 mt-4 sm:mt-6 inline-block ">
                            View All
                        </Link>
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
