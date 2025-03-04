import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ServicesMenu() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Start slightly below with opacity 0
            animate={{ opacity: 1, y: 0 }} // Move to normal position with opacity 1
            exit={{ opacity: 0, y: 20 }} // Fade out when closing
            transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
            className="absolute top-full left-32 lg:left-1/2 transform -translate-x-1/2 w-[85vw] max-w-6xl bg-white shadow-lg z-50 rounded-lg border border-gray-200"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                <div>
                    {/* Academic Services Section */}
                    <div className=" mb-3">
                        <h3 className="font-bold text-midnight text-lg mb-2">Academic Services:</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Enrollment", link: "/services/enrollment" },
                                { label: "OSHC", link: "/services/overseas-student-health-cover" },
                                { label: "OVHC", link: "/services/general-health-insurance" },
                                { label: "Scholarship", link: "/services/scholarship" },
                                { label: "IELTS/PTE Preparation", link: "/services/ielts-pte" },
                                { label: "Free Career Counceling", link: "/services/free-career-counseling" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 transition duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr className="border-t-2 border-red-300 mx-auto my-6" />
                    {/* Post-Academic Services Section */}
                    <div >
                        <h3 className="font-bold text-midnight text-lg mb-2">Post-Academic Services:</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Professional Year", link: "/services/professional-year" },
                                { label: "NAATI/CCL", link: "/services/naati-pte" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 transition duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    {/* Support Services Section */}
                    <div className="mb-3">
                        <h3 className="font-bold text-midnight text-lg mb-4">Support Services:</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Tax Return", link: "/services/tax-return" },
                                { label: "Airport Pikup", link: "/services/airport-pickup" },
                                { label: "Accomodation", link: "/services/accommodation" },
                                { label: "Bank Account Oppening", link: "/services/banking-support" },
                                { label: "General Health Insurance", link: "/services/general-health-insurance" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 transition duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr className="border-t-2 border-red-300 mx-auto my-6" />
                    {/* Pre-Departure Services Section */}
                    <div>
                        <h3 className="font-bold text-midnight text-lg mb-4">Pre-Departure Services:</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Pre-Departure Briefing", link: "/services/pre-departure" },
                                { label: "Air-Ticketing", link: "/services/air-ticketing" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 transition duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    {/* Visa Services Section */}
                    <div className="mb-3">
                        <h3 className="font-bold text-midnight text-lg mb-4">Visa Services:</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Student Visa", link: "/services/student-visa" },
                                { label: "Partner Visa", link: "/services/partner-visa" },
                                { label: "Visitor Visa", link: "/services/visitor-visa" },
                                { label: "Migration Services", link: "/services/migration-services" },
                                { label: "Other Type Visa", link: "/services/other-type-visa" },
                                { label: "Skilled/Work Visa", link: "/services/skilled-migrant-visa" },
                                { label: "Family/Parent Visa", link: "/services/family-parent-visa" },
                                { label: "Permanent Residency", link: "/services/permanent-residency" },
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 transition duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
