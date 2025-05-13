import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import logo from "../assets/logo_munemi_global.png"

export function Footer() {
    return (
        <footer className=" border-t-2 border-gray-400 mt-20 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <img
                            src={logo}
                            alt="ImmiEx"
                            className="h-30 mb-4 py-9"
                        />
                        <div className="text-gray-600 mb-4">
                            Munemi Global offers expert visa and immigration services, ensuring a smooth, hassle-free process with professional guidance and reliable support at every step.
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-midnight mb-4">Contact Details</div>
                        <div className="space-y-2 text-gray-600">
                            <div>
                                5, Kolotan School Road,
                                <br />
                                Notun Bazar, Vatara,
                                <br />
                                Gulshan Dhaka-1212, Bangladesh
                            </div>
                            <div>Phone: +88 01600300877</div>
                            <div>Email: info@munemiglobal.com</div>

                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-midnight mb-4">Useful Links</div>
                        <div className="space-y-2">
                            {[
                                { tag: "About Munemi Global", links: '/about' },
                                { tag: "Visa Information", links: '/services' },
                                { tag: "Immigration FAQ", links: '/services' },
                                { tag: "Immigration Assistance", links: '/' },
                                { tag: "Munemi Global Testimonials", links: '/' },
                                { tag: "Contact Us", links: '/' },
                                { tag: "Terms and Conditions", links: '/' }
                            ].map((link) => (
                                <div key={link.tag}>
                                    <Link to={link.links} className="text-gray-600 hover:text-red-500">
                                        {link.tag}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-midnight mb-4">Visas</div>
                        <div className="space-y-2">
                            {[
                                "Visitor Visas",
                                "Permanent Residence Visas",
                                "Business Visas",
                                "Working Holiday Visas",
                                "Studying & Training Visas",
                                "Skilled Work Visas",
                                "Family & Partner Visas",
                            ].map((visa) => (
                                <div key={visa}>
                                    <Link to="#" className="text-gray-600 hover:text-red-500">
                                        {visa}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t py-8 flex flex-wrap justify-between items-center">
                    <div className="text-gray-600">
                        © Copyright Munemi Global 2025. All Rights Reserved
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/munemiglobalbd" className="text-gray-400 hover:text-red-500">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500">
                            <FaXTwitter size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500">
                            <FaGoogle size={20} />
                        </a>
                        <a href="https://mail.munemiglobal.com/" target="_blank" className="text-gray-400 hover:text-red-500">
                            <FaEnvelope size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
