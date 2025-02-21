import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
export function TopHeader() {
    return (
        <div className=" hidden lg:block bg-gray-50 text-sm py-3 border border-gray-200">
            <div className="max-w-7xl text-gray-600 mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>House- 5, Kolotan School Road, Notun Bazar, Badda , Dhaka</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <FaWhatsapp size={19} className="mr-1" />
                        <span>+88 01978100105</span>
                    </div>
                    <div className="flex items-center">
                        <Phone size={14} className="mr-1" />
                        <span>+88 01600300877</span>
                    </div>
                    <div className="h-5 w-px bg-gray-300"></div>
                    <div className="flex items-center">
                        <Mail size={14} className="mr-1" />
                        <span>info@munemiglobal.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
