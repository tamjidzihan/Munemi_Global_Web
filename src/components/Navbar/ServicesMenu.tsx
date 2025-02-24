import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ServicesMenu() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Start slightly below with opacity 0
            animate={{ opacity: 1, y: 0 }} // Move to normal position with opacity 1
            exit={{ opacity: 0, y: 20 }} // Fade out when closing
            transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-[85vw] max-w-6xl bg-white shadow-lg z-50 rounded-lg border border-gray-200"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                {/* What We Offer Section */}
                <div>
                    <div className=" mb-3">
                        <h3 className="font-bold text-midnight text-lg mb-2">Academic Services:</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Enrollment", link: "/" },
                                { label: "OSHC", link: "/" },
                                { label: "OVHC", link: "/" },
                                { label: "Scholarship", link: "/" },
                                { label: "IELTS/PTE Preparation", link: "/" },
                                { label: "Free Career Counceling", link: "/" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-gray-900 transition duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr className="border-t-2 border-red-300 w-3/4  mx-auto my-6" />
                    <div >
                        <h3 className="font-bold text-midnight text-lg mb-2">Post-Academic Services:</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Professional Year", link: "/" },
                                { label: "NAATI/CCL", link: "/" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-gray-900 transition duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Featured News Section */}
                <div>
                    <div className="mb-3">
                        <h3 className="font-bold text-midnight text-lg mb-4">Support Services:</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Tax Return", link: "/" },
                                { label: "Airport Pikup", link: "/" },
                                { label: "Accomodation", link: "/" },
                                { label: "Bank Account Oppening", link: "/" },
                                { label: "General Helth Opening", link: "/" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-gray-900 transition duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr className="border-t-2 border-red-300 w-3/4  mx-auto my-6" />
                    <div>
                        <h3 className="font-bold text-midnight text-lg mb-4">Pre-Departure Services</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Pre-Departure Briefing", link: "/" },
                                { label: "Air-Ticketing", link: "/" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-gray-900 transition duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Latest News Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">LATEST NEWS:</h3>
                    <ul className="space-y-3">
                        {[
                            { label: "Student Visa Assessment", link: "/student-visa" },
                            { label: "Working Visa Assessment", link: "/working-visa" },
                            { label: "Business Visa Assessment", link: "/business-visa" },
                            { label: "PR Visa Assessment", link: "/pr-visa" },
                            { label: "Visa Eligibility Assessment", link: "/eligibility" },
                            { label: "Family Visa Assessment", link: "/family-visa" },
                            { label: "Immigration Consultation", link: "/consultation" },
                        ].map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.link}
                                    className="text-gray-600 hover:text-gray-900 transition duration-300"
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
}
