import { Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export function TopHeader() {
    return (
        <div className="bg-gray-50 text-sm py-1 border border-gray-200">
            <div className="max-w-7xl text-gray-600 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                {/* Address Section (Hidden on Small Screens) */}
                <div className="hidden sm:flex items-center space-x-4">
                    <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span className="text-xs sm:text-sm">
                            5, Kolotan School Road, Notun Bazar, Vatara, Gulshan Dhaka-1212, Bangladesh
                        </span>
                    </div>
                </div>

                {/* Contact and Appointment Section */}
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* WhatsApp Link */}
                    <Link
                        to="https://wa.me/+8801600300877"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center hover:text-red-600"
                    >
                        <FaWhatsapp size={16} className="mr-1" />
                        <span className="text-xs sm:text-sm">+88 01600300877</span>
                    </Link>

                    {/* Divider (Hidden on Small Screens) */}
                    <div className="h-5 w-px bg-gray-300 hidden sm:block"></div>

                    {/* Email Link */}
                    <Link
                        to="mailto:info@munemiglobal.com"
                        target="_blank"
                        className="hidden sm:flex items-center hover:text-red-600"
                    >
                        <Mail size={14} className="mr-1" />
                        <span className="text-xs sm:text-sm">info@munemiglobal.com</span>
                    </Link>

                    {/* Appointment Button */}
                    <Link to="about/appointment-booking" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto text-center cursor-pointer py-1.5 px-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.08] shadow-lg hover:shadow-xl text-xs sm:text-sm">
                            Book An Appointment
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
