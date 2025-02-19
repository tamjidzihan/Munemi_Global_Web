import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
export function Navbar() {
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    return (
        <nav className="w-full bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://placehold.co/100x40"
                                alt="ImmiEx"
                                className="h-8"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-gray-900 px-3 py-2"
                        >
                            HOME
                        </Link>
                        <Link
                            to="/pages"
                            className="text-gray-700 hover:text-gray-900 px-3 py-2"
                        >
                            PAGES
                        </Link>
                        <div
                            className="relative"
                            onMouseEnter={() => setShowMegaMenu(true)}
                            onMouseLeave={() => setShowMegaMenu(false)}
                        >
                            <button className="text-gray-700 hover:text-gray-900 px-3 py-2">
                                MEGA MENU
                            </button>
                            {showMegaMenu && <MegaMenu />}
                        </div>
                        <Link
                            to="/blog"
                            className="text-gray-700 hover:text-gray-900 px-3 py-2"
                        >
                            BLOG
                        </Link>
                        <Link
                            to="/faqs"
                            className="text-gray-700 hover:text-gray-900 px-3 py-2"
                        >
                            FAQS
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            GET STARTED
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-gray-900">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
