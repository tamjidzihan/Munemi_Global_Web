import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ServicesMenuSideBar = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }} // Start from the left with opacity 0
            animate={{ opacity: 1, x: 0 }} // Move to normal position with opacity 1
            exit={{ opacity: 0, x: -20 }} // Fade out when closing
            transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
            className="bg-white shadow-lg rounded-lg border border-gray-200 p-4 w-full"
        >
            <h2 className="text-xl font-bold text-midnight mb-4">Our Services</h2>
            <div className="space-y-4">
                {/* Academic Services Section */}
                <div>
                    <h3 className="font-semibold text-lg text-midnight mb-2">Academic Services</h3>
                    <ul className="space-y-2">
                        {[
                            { label: "Enrollment", link: "/services/enrollment" },
                            { label: "OSHC", link: "/services/overseas-student-health-cover" },
                            { label: "OVHC", link: "/services/general-health-insurance" },
                            { label: "Scholarship", link: "/services/scholarship" },
                            { label: "IELTS/PTE Preparation", link: "/services/ielts-pte" },
                            { label: "Free Career Counseling", link: "/services/free-career-counseling" }
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
                <div>
                    <h3 className="font-semibold text-lg text-midnight mb-2">Post-Academic Services</h3>
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

                <hr className="border-t-2 border-red-300 mx-auto my-6" />

                {/* Support Services Section */}
                <div>
                    <h3 className="font-semibold text-lg text-midnight mb-2">Support Services</h3>
                    <ul className="space-y-2">
                        {[
                            { label: "Tax Return", link: "/services/tax-return" },
                            { label: "Airport Pickup", link: "/services/airport-pickup" },
                            { label: "Accommodation", link: "/services" },
                            { label: "Bank Account Opening", link: "/services" },
                            { label: "General Health Opening", link: "/services" }
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
                    <h3 className="font-semibold text-lg text-midnight mb-2">Pre-Departure Services</h3>
                    <ul className="space-y-2">
                        {[
                            { label: "Pre-Departure Briefing", link: "/" },
                            { label: "Air-Ticketing", link: "/" }
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

                {/* Visa Services Section */}
                <div>
                    <h3 className="font-semibold text-lg text-midnight mb-2">Visa Services</h3>
                    <ul className="space-y-2">
                        {[
                            { label: "Student Visa", link: "/" },
                            { label: "Partner Visa", link: "/" },
                            { label: "Visitor Visa", link: "/" },
                            { label: "Migration Services", link: "/" },
                            { label: "Other Type Visa", link: "/" },
                            { label: "Skilled/Work Visa", link: "/" },
                            { label: "Family/Parent Visa", link: "/" },
                            { label: "Permanent Residency", link: "/" }
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
        </motion.div>
    );
};

export default ServicesMenuSideBar;
