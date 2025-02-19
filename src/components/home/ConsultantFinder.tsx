import { ChevronRight } from "lucide-react";
export function ConsultantFinder() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Find a consultant by:
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Cursus porta, feugiat primis in ultrice ligula risus auctor tempus
                    dolor feugiat, felis lacinia risus interdum auctor id viverra dolor
                    iaculis luctus placerat and massa
                </p>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="font-bold mb-4">Country:</h3>
                        <ul className="space-y-2">
                            {[
                                "Canada",
                                "Australia",
                                "United Kingdom",
                                "USA",
                                "New Zealand",
                                "South Korea",
                            ].map((country) => (
                                <li
                                    key={country}
                                    className="flex items-center text-gray-600 hover:text-gray-900"
                                >
                                    <ChevronRight size={16} className="mr-2" />
                                    <a href="#">{country}</a>
                                </li>
                            ))}
                        </ul>
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
                        >
                            View All »
                        </a>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Practice Area:</h3>
                        <ul className="space-y-2">
                            {[
                                "Student Visa",
                                "Skilled Work Visa",
                                "Business visa",
                                "Spouse/Family Visa",
                                "Tourist & Visitor Visa",
                                "Immigration Consult",
                            ].map((area) => (
                                <li
                                    key={area}
                                    className="flex items-center text-gray-600 hover:text-gray-900"
                                >
                                    <ChevronRight size={16} className="mr-2" />
                                    <a href="#">{area}</a>
                                </li>
                            ))}
                        </ul>
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
                        >
                            View All »
                        </a>
                    </div>
                </div>
                <div className="mt-12">
                    <img
                        src="https://raw.githubusercontent.com/lipis/flag-icons/master/world.svg"
                        alt="World Map"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </section>
    );
}
