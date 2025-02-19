import { Link } from "react-router-dom";
const countries = [
    {
        name: "AUSTRALIA",
        flag: "https://images.unsplash.com/photo-1587302186428-d1d969a8a493",
    },
    {
        name: "CANADA",
        flag: "https://images.unsplash.com/photo-1535673774336-ef95d2851cf3",
    },
    {
        name: "UNITED KINGDOM",
        flag: "https://images.unsplash.com/photo-1526659031771-a12c12522e04",
    },
    {
        name: "NEW ZEALAND",
        flag: "https://images.unsplash.com/photo-1577430607783-677a30e85bc9",
    },
    {
        name: "SINGAPORE",
        flag: "https://images.unsplash.com/photo-1565967511849-76a60a516170",
    },
    {
        name: "USA",
        flag: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995",
    },
];
export function ImmigrationConsult() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Immigration Consult
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Cursus porta, feugiat primis in ultrice ligula risus auctor tempus
                    dolor feugiat, felis lacinia risus interdum auctor id viverra dolor
                    iaculis luctus placerat and massa
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {countries.map((country) => (
                        <Link
                            key={country.name}
                            to={`/immigration/${country.name.toLowerCase()}`}
                            className="relative overflow-hidden rounded-lg group"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={country.flag}
                                    alt={country.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="text-white font-bold">{country.name}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
