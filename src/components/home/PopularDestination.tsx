import { Link } from "react-router-dom";
import australiaFlag from "../../assets/flags/australia_flag.jpg"
import canadaFlag from "../../assets/flags/canada_flag.jpg"
import frenchFlag from "../../assets/flags/french_flag.jpg"
import hungaryFlag from "../../assets/flags/hungary_flag.jpg"
import saudiarabiaFlag from "../../assets/flags/saudiarabia_flag.jpg"
import spainFlag from "../../assets/flags/spain_flag.jpg"
import ukflag from "../../assets/flags/uk_flag.jpg"
import usaflag from "../../assets/flags/usa_flag.jpg"

const countries = [
    {
        name: "CANADA",
        flag: canadaFlag,
        tag: "Student Visa & Visit Visa"
    },
    {
        name: "UNITED STATES",
        flag: usaflag,
        tag: "Student Visa & Visit Visa"
    },
    {
        name: "AUSTRALIA",
        flag: australiaFlag,
        tag: "Student Visa & Visit Visa"
    },
    {
        name: "UNITED KINGDOM",
        flag: ukflag,
        tag: "Student Visa & Visit Visa"
    },
    {
        name: "HUNGARY",
        flag: hungaryFlag,
        tag: "Rome, Milan, Naples"

    },
    {
        name: "FRANCE",
        flag: frenchFlag,
        tag: "Student Visa & Visit Visa"
    },
    {
        name: "Saudi Arabia",
        flag: saudiarabiaFlag,
        tag: "Umrah & Hajj"
    },
    {
        name: "SPAIN",
        flag: spainFlag,
        tag: "Student Visa & Visit Visa"
    },
];

export function PopularDestination() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-medium mb-4 text-midnight">
                        Popular Destination
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Start your immigration journey with our expert guidance
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {countries.map((country) => (
                        <Link
                            key={country.name}
                            to={`/study-destination/${country.name.split(' ').join('').toLowerCase()}`}
                            className="group relative block h-96 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                alt={country.name}
                                src={country.flag}
                                className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:blur-xs"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                            <div className="relative p-6 h-full flex flex-col justify-end">
                                <p className="text-sm font-medium uppercase tracking-widest text-white">
                                    Destination
                                </p>
                                <p className="text-4xl font-bold text-white mt-2">
                                    {country.name}
                                </p>

                                <div className="mt-24 transform translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="border-t border-red-600 pt-4">
                                        <p className="text-sm text-white/90">
                                            {country.tag} {" services for "}{country.name.split(' ')[0]}
                                        </p>
                                        <div className="mt-4 flex items-center text-blue-300 hover:text-blue-200 transition-colors">
                                            <span className="text-sm font-medium">View Details</span>
                                            <svg
                                                className="ml-2 w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}





