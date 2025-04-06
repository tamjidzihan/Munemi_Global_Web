import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_munemi_global.png";
import CareerMenu from "./Navbar/CareerMenu";
import ServicesMenu from "./Navbar/ServicesMenu";
import { StudyDestinationMenu } from "./Navbar/StudyDestinationMenu";
import Sidebar from "./Sidebar";

export function Navbar() {
    const [showStudyDestination, setShowStudyDestination] = useState(false);
    const [showServicesMenu, setShowServicesMenu] = useState(false);
    const [showCareerMenu, setShowCareerMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <nav
            className={`w-full bg-white shadow sticky top-0 z-50 transition-all duration-300 flex justify-center ${isScrolled ? "h-14" : "h-20"
                }`}
        >
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link onClick={scrollToTop} to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Munemi Global Logo"
                            className={`transition-all duration-300 ${isScrolled ? "h-15" : "h-18"}`}
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center space-x-3 lg:space-x-10 ">
                    <Link to="/" onClick={scrollToTop} className="text-gray-600 hover:text-gray-800 transition duration-300 font-bold">
                        HOME
                    </Link>
                    <div
                        className="relative"
                        onMouseEnter={() => setShowServicesMenu(true)}
                        onMouseLeave={() => setShowServicesMenu(false)}
                    >
                        <button className={`text-gray-600 hover:text-gray-800 font-bold transition duration-300 cursor-pointer flex ${isScrolled ? "py-2" : "py-3"}`}>
                            SERVICES
                            <ChevronDown size={20} className=" place-self-center" />
                        </button>
                        {showServicesMenu && <ServicesMenu />}
                    </div>
                    <div
                        className="relative"
                        onMouseEnter={() => setShowStudyDestination(true)}
                        onMouseLeave={() => setShowStudyDestination(false)}
                    >
                        <button className={`text-gray-600 hover:text-gray-800 font-bold transition duration-300 cursor-pointer flex ${isScrolled ? "py-2" : "py-3"}`}>
                            STUDY DESTINATION
                            <ChevronDown size={20} className=" place-self-center" />
                        </button>
                        {showStudyDestination && <StudyDestinationMenu />}
                    </div>
                    <Link to="/blog" className="text-gray-600 hover:text-gray-800 font-bold transition duration-300">
                        BLOG
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-gray-800 font-bold transition duration-300">
                        ABOUT US
                    </Link>

                    <div
                        className="relative"
                        onMouseEnter={() => setShowCareerMenu(true)}
                        onMouseLeave={() => setShowCareerMenu(false)}
                    >
                        <button className={`px-4 py-2 hover:text-red-600 hover:font-medium text-white font-semibold border border-red-500 bg-red-500 hover:bg-white transition duration-300 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm text-center ${isScrolled ? "py-1" : "py-2"}`}>
                            BECOME PART OF US
                        </button>
                        {showCareerMenu && <CareerMenu />}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidebarOpen(!sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm border border-stroke  p-1.5 shadow-sm  bg-midnight lg:hidden"
                    >
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="du-block absolute right-0 h-full w-full">
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-[0] duration-200 ease-in-out bg-white ${!sidebarOpen && '!w-full delay-300'
                                        }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-150 duration-200 ease-in-out bg-white ${!sidebarOpen && 'delay-400 !w-full'
                                        }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-200 duration-200 ease-in-out bg-white ${!sidebarOpen && '!w-full delay-500'
                                        }`}
                                ></span>
                            </span>
                            <span className="absolute right-0 h-full w-full rotate-45">
                                <span
                                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm  delay-300 duration-200 ease-in-out bg-white ${!sidebarOpen && '!h-0 !delay-[0]'
                                        }`}
                                ></span>
                                <span
                                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm  duration-200 ease-in-out bg-white ${!sidebarOpen && '!h-0 !delay-200'
                                        }`}
                                ></span>
                            </span>
                        </span>
                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}
                </div>
            </div>

        </nav >
    );
}
