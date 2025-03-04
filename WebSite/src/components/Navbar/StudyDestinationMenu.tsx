import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const studyDestination = [
    { label: "Australia", link: "/" },
    { label: "United States", link: "/" },
    { label: "Canada", link: "/" },
    { label: "United Kindom", link: "/" },
    { label: "New Zealand", link: "/" },
    { label: "United Arab Emirates", link: "/" },
    { label: "Malaysia", link: "/" },
    { label: "Malta", link: "/" }
]

const studyAbroad = [
    { label: "Study Guides", link: "/" },
    { label: "Global Career Pathway", link: "/" },
    { label: "Study Abroad FAQ", link: "/" },
    { label: "Networking & Socialization", link: "/" }
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
                    <h3 className="font-bold text-midnight text-lg mb-2">Study Destination :</h3>
                    <ul className="space-y-2">
                        {studyDestination.map((item, index) => (
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
                {/* Support Services Section */}
                <div className="mb-3">
                    <h3 className="font-bold text-midnight text-lg mb-4">Study Abroad :</h3>
                    <ul className="space-y-2">
                        {studyAbroad.map((item, index) => (
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
}
