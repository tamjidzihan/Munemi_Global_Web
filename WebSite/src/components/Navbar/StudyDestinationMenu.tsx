/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export const studyDestination = [
    { label: "Australia", link: "/study-destination/australia" },
    { label: "United States", link: "/study-destination/unitedstates" },
    { label: "Canada", link: "/study-destination/canada" },
    { label: "United Kingdom", link: "/study-destination/unitedkingdom" },
    { label: "Hungary", link: "/study-destination/hungary" },
    { label: "France", link: "/study-destination/france" },
    { label: "Saudi Arabia", link: "/study-destination/saudiarabia" },
    { label: "Spain", link: "/study-destination/spain" }
]

export const studyAbroad = [
    { label: "Study Guides", link: "/study-destination/studyguides" },
    { label: "Global Career Pathway", link: "/study-destination/global-career-pathway" },
    { label: "Study Abroad FAQ", link: "/study-destination/study-abroad-faq" },
    { label: "Networking & Socialization", link: "/study-destination/networking-&-socialization" }
]

export function StudyDestinationMenu() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Start slightly below with opacity 0
            animate={{ opacity: 1, y: 0 }} // Move to normal position with opacity 1
            exit={{ opacity: 0, y: 20 }} // Fade out when closing
            transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
            className="absolute top-full left-32 lg:left-1/2 transform -translate-x-1/2 w-[80vw] max-w-2xl bg-white shadow-lg z-50 rounded-lg border border-gray-200"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Study Destination Section */}
                <div className=" mb-3">
                    <div className="font-bold text-midnight text-lg mb-2">Study Destination :</div>
                    <div className="space-y-2">
                        {studyDestination.map((item, index) => (
                            <div key={index}>
                                <Link
                                    to={`/study-destination/${item.label.split(' ').join('').toLocaleLowerCase()}`}
                                    className="text-gray-700 hover:text-red-600 hover:pl-2 transform duration-300 text-base"
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Support Services Section */}
                <div className="mb-3">
                    <div className="font-bold text-midnight text-lg mb-4">Study Abroad :</div>
                    <div className="space-y-2">
                        {studyAbroad.map((item, index) => (
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
        </motion.div>
    );
}
