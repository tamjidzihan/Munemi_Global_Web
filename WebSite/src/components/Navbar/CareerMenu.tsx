import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";


const CareerMenu = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Start slightly below with opacity 0
            animate={{ opacity: 1, y: 0 }} // Move to normal position with opacity 1
            exit={{ opacity: 0, y: 20 }} // Fade out when closing
            transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
            className="absolute top-full left-32 lg:left-1/2 transform -translate-x-1/2 w-[15vw] max-w-6xl bg-white shadow-lg z-50 rounded-lg border border-gray-200"
        >
            <div className=" flex p-8">
                <div>
                    {/* Academic Services Section */}
                    <div className=" mb-3">
                        <h3 className="font-bold text-midnight text-lg mb-2">Join Us :</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Refer & Earn", link: "/" },
                                { label: "Career with us", link: "/" },
                                { label: "Become an Agent (B2B)", link: "/" },
                                { label: "Become an Institute Partner", link: "/" },
                                { label: "Become a Health Insurance Partner", link: "/" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700  hover:text-red-600 transition duration-300 text-base"
                                    >
                                        <ChevronRight size={20} className=" place-self-center inline-block " />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default CareerMenu