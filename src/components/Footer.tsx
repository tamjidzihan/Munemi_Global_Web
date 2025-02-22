import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo_munemi_global.png"

export function Footer() {
    return (
        <footer className="bg-white pt-20 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <img
                            src={logo}
                            alt="ImmiEx"
                            className="h-30 mb-4"
                        />
                        <p className="text-gray-600 mb-4">
                            Aliquam orci a nullam tempor undo sapien donec gravida an enim
                            ipsum porta justo velna auctor and congue magna laoreet an augue
                            sapien
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-midnight mb-4">Contact Details</h3>
                        <div className="space-y-2 text-gray-600">
                            <p>
                                House- 5, Kolotan School Road,
                                <br />
                                Notun Bazar, Badda , Dhaka
                            </p>
                            <p>Phone: +88 01978100105</p>
                            <p>Email: info@munemiglobal.com</p>

                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-midnight mb-4">Useful Links</h3>
                        <ul className="space-y-2">
                            {[
                                "About Munemi Global",
                                "Visa Information",
                                "Immigration FAQ",
                                "Immigration Assistance",
                                "Munemi Global Testimonials",
                                "Contact Us",
                                "Terms and Conditions",
                            ].map((link) => (
                                <li key={link}>
                                    <Link to="#" className="text-gray-600 hover:text-red-500">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-midnight mb-4">Visas</h3>
                        <ul className="space-y-2">
                            {[
                                "Visitor Visas",
                                "Permanent Residence Visas",
                                "Business Visas",
                                "Working Holiday Visas",
                                "Studying & Training Visas",
                                "Skilled Work Visas",
                                "Family & Partner Visas",
                            ].map((visa) => (
                                <li key={visa}>
                                    <Link to="#" className="text-gray-600 hover:text-red-500">
                                        {visa}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="border-t py-8 flex flex-wrap justify-between items-center">
                    <p className="text-gray-600">
                        © Copyright Munemi Global 2025. All Rights Reserved
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-red-500">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500">
                            <FaXTwitter size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500">
                            <FaGoogle size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
