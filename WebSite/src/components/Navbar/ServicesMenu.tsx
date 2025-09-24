/* eslint-disable react-refresh/only-export-components */
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const academicServices = [
    { label: "Enrollment", link: "/services/enrollment" },
    { label: "OSHC", link: "/services/overseas-student-health-cover" },
    { label: "OVHC", link: "/services/general-health-insurance" },
    { label: "Scholarship", link: "/services/scholarship" },
    { label: "IELTS/PTE Preparation", link: "/services/ielts-pte" },
    { label: "Free Career Counceling", link: "/services/free-career-counseling" }
]

export const postAcademicServices = [
    { label: "Professional Year", link: "/services/professional-year" },
    { label: "NAATI/CCL", link: "/services/naati-pte" }
]

export const supportServices = [
    { label: "Tax Return", link: "/services/tax-return" },
    { label: "Airport Pikup", link: "/services/airport-pickup" },
    { label: "Accomodation", link: "/services/accommodation" },
    { label: "Bank Account Oppening", link: "/services/banking-support" },
    { label: "General Health Insurance", link: "/services/general-health-insurance" }
]

export const preDepartureServices = [
    { label: "Pre-Departure Briefing", link: "/services/pre-departure" },
    { label: "Air-Ticketing", link: "/services/air-ticketing" }
]

export const visaServices = [
    { label: "Student Visa", link: "/services/student-visa" },
    { label: "Partner Visa", link: "/services/partner-visa" },
    { label: "Visitor Visa", link: "/services/visitor-visa" },
    { label: "Migration Services", link: "/services/migration-services" },
    { label: "Other Type Visa", link: "/services/other-type-visa" },
    { label: "Skilled/Work Visa", link: "/services/skilled-migrant-visa" },
    { label: "Family/Parent Visa", link: "/services/family-parent-visa" },
    { label: "Permanent Residency", link: "/services/permanent-residency" },
]


export default function ServicesMenu() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/agentlogin')
    };
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
                        <div className="font-bold text-midnight text-lg mb-2">Academic Services:</div>
                        <div className="space-y-2">
                            {academicServices.map((item, index) => (
                                <div key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 hover:pl-2 transform duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="border-t-2 border-red-300 mx-auto my-6" />
                    {/* Post-Academic Services Section */}
                    <div >
                        <div className="font-bold text-midnight text-lg mb-2">Post-Academic Services:</div>
                        <div className="space-y-2">
                            {postAcademicServices.map((item, index) => (
                                <div key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 hover:pl-2 transform duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    {/* Support Services Section */}
                    <div className="mb-3">
                        <div className="font-bold text-midnight text-lg mb-4">Support Services:</div>
                        <div className="space-y-2">
                            {supportServices.map((item, index) => (
                                <div key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 hover:pl-2 transform duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="border-t-2 border-red-300 mx-auto my-6" />
                    {/* Pre-Departure Services Section */}
                    <div>
                        <div className="font-bold text-midnight text-lg mb-4">Pre-Departure Services:</div>
                        <div className="space-y-2">
                            {preDepartureServices.map((item, index) => (
                                <div key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 hover:pl-2 transform duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>

                    {/* Visa Services Section */}
                    <div className="mb-3">
                        <div className="font-bold text-midnight text-lg mb-4">Visa Services:</div>
                        <div className="space-y-2">
                            {visaServices.map((item, index) => (
                                <div key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700 hover:text-red-600 hover:pl-2 transform duration-300 text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <hr className="border-t-2 border-red-300 mx-auto my-6" />
                        <motion.button
                            onClick={handleClick}
                            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group cursor-pointer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center gap-2">
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    animate={{
                                        scale: [1, 1.2, 1],
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
                            </div>
                        </motion.button>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
