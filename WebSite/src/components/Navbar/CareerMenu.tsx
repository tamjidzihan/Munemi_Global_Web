import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAgentAuth } from "../../context/AgentAuthProvider";
import { useAuth } from "../../context/AuthContext";

const CareerMenu = () => {
    const { agent, logoutAgent } = useAgentAuth()
    const { user, logout } = useAuth()

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
                        <div className="font-bold text-midnight text-lg mb-2">Join Us :</div>
                        <div className="space-y-2">
                            {/* Admin Dashboard Button - Only show when user is logged in */}
                            {user && (
                                <Link
                                    to="/adminpanel"
                                    className="flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 transition duration-300 text-base font-medium"
                                >
                                    <ChevronRight size={20} />
                                    <span className="hidden sm:inline">Admin Dashboard</span>
                                </Link>
                            )}

                            {[
                                { label: "Career with us", link: "/career" },
                                // { label: "Job Application", link: "/career/job-application" },
                                { label: "Become an Agent (B2B)", link: "/career/agents-application" },
                                // { label: "Become an Institute Partner", link: "/career/institution-partner-application" },
                                // { label: "Become a Health Insurance Partner", link: "/career/health-insurance-partner-application" },
                            ].map((item, index) => (
                                <div key={index}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-700  hover:text-red-600 transition duration-300 text-base"
                                    >
                                        <ChevronRight size={20} className=" place-self-center inline-block " />
                                        {item.label}
                                    </Link>
                                </div>
                            ))}

                            {user ? (
                                <div
                                    onClick={() => logout()}
                                    className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition duration-300 text-base font-medium cursor-pointer"
                                >
                                    <ChevronRight size={20} />
                                    <span className="hidden sm:inline">User Logout</span>
                                </div>
                            ) : (
                                <Link
                                    to="/signin"
                                    className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition duration-300 text-base font-medium cursor-pointer"
                                >
                                    <ChevronRight size={20} />
                                    <span className="hidden sm:inline">User Login</span>
                                </Link>
                            )}

                            {agent ? (
                                <div
                                    onClick={() => logoutAgent()}
                                    className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition duration-300 text-base font-medium cursor-pointer"
                                >
                                    <ChevronRight size={20} />
                                    <span className="hidden sm:inline">Agent Logout</span>
                                </div>
                            ) : (
                                <Link
                                    to="/agentlogin"
                                    className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition duration-300 text-base font-medium"
                                >
                                    <ChevronRight size={20} />
                                    <span className="hidden sm:inline">Agent Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default CareerMenu