import { Link } from "react-router-dom";
export function MegaMenu() {
    return (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 p-8">
                <div>
                    <h3 className="font-bold text-lg mb-4">WHAT WE OFFER:</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                to="/student-visa"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Student Visa Assessment
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/working-visa"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Working Visa Assessment
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/business-visa"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Business Visa Assessment
                            </Link>
                        </li>
                        <li>
                            <Link to="/pr-visa" className="text-gray-600 hover:text-gray-900">
                                PR Visa Assessment
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/eligibility"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Visa Eligibility Assessment
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/family-visa"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Family Visa Assessment
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/consultation"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Immigration Consultation
                            </Link>
                        </li>
                    </ul>
                </div>
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
                            Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta
                            justo. Velna vitae auctor congue magna tempor sodales sapien donec
                            ipsum, at porta justo purus ipsum neque
                        </p>
                    </div>
                </div>
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
        </div>
    );
}
