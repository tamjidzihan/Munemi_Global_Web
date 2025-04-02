import { useState } from "react";
import useUniversity from "../../hooks/useUniversity";
import Loader from "../common/Loader";
const countries = [
    "All Countries",
    "Australia",
    "United States",
    "Canada",
    "United Kingdom",
    "Hungary",
    "France",
    "Saudi Arabia",
    "Spain",
];
// const universities = Array(20)
//     .fill(null)
//     .map((_, index) => ({
//         id: index + 1,
//         name: `Enter University Name Here`,
//         logo: "https://placehold.co/200x100?text=University+Logo",
//         country: countries[Math.floor(Math.random() * (countries.length - 1)) + 1],
//     }));
export function PartnerUniversities() {
    const { universities, loading } = useUniversity()
    const [selectedCountry, setSelectedCountry] = useState("All Countries");
    const filteredUniversities = universities.filter(
        (uni) =>
            selectedCountry === "All Countries" || uni.country === selectedCountry,
    );


    if (loading) return <Loader />;
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl text-midnight font-bold text-center mb-4">
                    Partner Institutes & Universities
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Our partner institutes and universities are committed to transforming lives through quality education.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {countries.map((country) => (
                        <button
                            key={country}
                            onClick={() => setSelectedCountry(country)}
                            className={`px-4 py-2 rounded-full ${selectedCountry === country ? "bg-red-500 text-white" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            {country}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {filteredUniversities.map((university) => (
                        <div
                            key={university.id}
                            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={`${import.meta.env.VITE_APICLIENT}/uploads/${university.logo}`}
                                alt={university.name}
                                className="w-full h-auto"
                            />
                            <p className="text-sm text-gray-600 text-center mt-2">
                                {university.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
