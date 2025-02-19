import { Phone, Mail, MapPin } from "lucide-react";
export function TopHeader() {
    return (
        <div className="bg-gray-100 text-sm py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>121 King St, Melbourne, Victoria 3000</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <Phone size={14} className="mr-1" />
                        <span>+61-2 3456 7890</span>
                    </div>
                    <div className="flex items-center">
                        <Mail size={14} className="mr-1" />
                        <span>hello@domain.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
