import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import { MegaMenu } from "./Navbar/MegaMenu";
import logo from "../assets/logo_munemi_global.png"
import { ServicesMenu } from "./Navbar/ServicesMenu";
import CareerMenu from "./Navbar/CareerMenu";

export function Navbar() {
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showServicesMenu, setShowServicesMenu] = useState(false);
    const [showCareerMenu, setShowCareerMenu] = useState(false);
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
            className={`w-full bg-white shadow sticky top-0 z-50 transition-all duration-300 flex justify-center ${isScrolled ? "h-14" : "h-20"
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
                <div className="hidden md:flex items-center space-x-3 lg:space-x-10 ">
                    <Link to="/" className="text-gray-600 hover:text-gray-800 transition duration-300 font-bold">
                        HOME
                    </Link>
                    <div
                        className="relative"
                        onMouseEnter={() => setShowServicesMenu(true)}
                        onMouseLeave={() => setShowServicesMenu(false)}
                    >
                        <button className={`text-gray-600 hover:text-gray-800 font-bold transition duration-300 cursor-pointer flex ${isScrolled ? "py-3" : "py-6"}`}>
                            SERVICES
                            <ChevronDown size={20} className=" place-self-center" />
                        </button>
                        {showServicesMenu && <ServicesMenu />}
                    </div>
                    <div
                        className="relative"
                        onMouseEnter={() => setShowMegaMenu(true)}
                        onMouseLeave={() => setShowMegaMenu(false)}
                    >
                        <button className={`text-gray-600 hover:text-gray-800 font-bold transition duration-300 cursor-pointer flex ${isScrolled ? "py-3" : "py-6"}`}>
                            STUDY DESTINATION
                            <ChevronDown size={20} className=" place-self-center" />
                        </button>
                        {showMegaMenu && <MegaMenu />}
                    </div>
                    <Link to="/" className="text-gray-600 hover:text-gray-800 font-bold transition duration-300">
                        BLOG
                    </Link>
                    <Link to="/" className="text-gray-600 hover:text-gray-800 font-bold transition duration-300">
                        ABOUT US
                    </Link>

                    <div
                        className="relative"
                        onMouseEnter={() => setShowCareerMenu(true)}
                        onMouseLeave={() => setShowCareerMenu(false)}
                    >
                        <button className={`px-4 py-2 hover:text-red-600 text-white border border-red-500 bg-red-500 hover:bg-white transition duration-300 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center ${isScrolled ? "py-1" : "py-2"}`}>
                            BECOME PART OF US
                        </button>
                        {showCareerMenu && <CareerMenu />}
                    </div>
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
