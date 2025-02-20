import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import logo from "../assets/logo_munemi_global.png"

export function Navbar() {
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`w-full bg-white border-b sticky top-0 z-50 transition-all duration-300 flex justify-center ${isScrolled ? "h-14" : "h-20"
                }`}
        >
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Munemi Global Logo"
                            className={`transition-all duration-300 ${isScrolled ? "h-15" : "h-18"}`}
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-gray-500 hover:text-gray-800 transition duration-300 font-bold">
                        HOME
                    </Link>
                    <Link to="/pages" className="text-gray-500 hover:text-gray-800 font-bold transition duration-300">
                        PAGES
                    </Link>
                    <div
                        className="relative"
                        onMouseEnter={() => setShowMegaMenu(true)}
                        onMouseLeave={() => setShowMegaMenu(false)}
                    >
                        <button className={`text-gray-500 *:hover:text-gray-800 font-bold transition duration-300 cursor-pointer ${isScrolled ? "py-3" : "py-6"}`}>
                            MEGA MENU
                        </button>
                        {showMegaMenu && <MegaMenu />}
                    </div>
                    <Link to="/blog" className="text-gray-500 hover:text-gray-800 font-bold transition duration-300">
                        BLOG
                    </Link>
                    <Link to="/faqs" className="text-gray-500 hover:text-gray-800 font-bold transition duration-300">
                        FAQS
                    </Link>
                    <Link to="/contact">
                        <button className="px-4 py-2 hover:text-red-700 text-white border border-red-700 bg-red-800 hover:bg-white transition duration-300 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center">
                            GET STARTED
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button className="text-gray-500 font-bold transition duration-300 hover:text-gray-800">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav >
    );
}
