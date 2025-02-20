import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function MegaMenu() {
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
                    <h3 className="font-bold text-lg mb-4">WHAT WE OFFER:</h3>
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

                {/* Featured News Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">FEATURED NEWS:</h3>
                    <div className="space-y-4">
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                            alt="Featured News"
                            className="rounded-lg w-full h-40 object-cover"
                        />
                        <h4 className="font-semibold">
                            Canada Federal Skilled Worker Program
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Aliquam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna.
                        </p>
                    </div>
                </div>

                {/* Latest News Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">LATEST NEWS:</h3>
                    <div className="space-y-4">
                        {[
                            {
                                title: "What visa do you need to work legally in Singapore?",
                                date: "February 26, 2020",
                                image:
                                    "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
                            },
                            {
                                title: "Top reasons for Australian working visa rejection",
                                date: "February 26, 2020",
                                image:
                                    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
                            },
                            {
                                title: "Canada Federal Skilled Worker Program",
                                date: "February 26, 2020",
                                image:
                                    "https://images.unsplash.com/photo-1535041422672-8c3254ab9de9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
                            },
                        ].map((news, index) => (
                            <div key={index} className="flex gap-4">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h4 className="font-medium text-sm">{news.title}</h4>
                                    <p className="text-gray-500 text-xs">{news.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
