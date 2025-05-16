import usePackage from "../../hooks/usePackage"
import { Link } from 'react-router-dom';
import PackageMenuCard from "../Package/PackageMenuCard";

const PopularPackage = () => {
    const { packages } = usePackage()

    // Filter active packages and limit to 3 per type
    // const domesticPackages = packages
    //     .filter(pkg => pkg.type === "Domestic" && pkg.isActive)
    //     .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    //     .slice(0, 3);
    // const internationalPackages = packages
    //     .filter(pkg => pkg.type === "International" && pkg.isActive)
    //     .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    //     .slice(0, 3);

    return (
        <section className="pt-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="text-3xl sm:text-4xl font-medium mb-4 text-midnight">
                        Popular Packages
                    </div>
                    <div className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Your next great adventure starts with our best travel packages.
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.length > 0 ? (
                        packages
                            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                            .slice(0, 6)
                            .map((pkg) =>
                                <PackageMenuCard
                                    key={pkg.id}
                                    id={pkg.id}
                                    destination={pkg.destination}
                                    duration={pkg.duration}
                                    image={pkg.images}
                                    people={pkg.numberOftraveller?.toString()}
                                    title={pkg.title}
                                    price={pkg.price?.toString()}
                                    priceSubtext="Per person"
                                />
                            )
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-gray-500">No Packages available.</p>
                        </div>
                    )}
                </div>
                {/* Button to see all packages */}
                <div className="text-center mt-8">
                    <Link to="/package" className="px-4 py-2 hover:text-red-600 hover:font-medium text-white font-semibold border border-red-500 bg-red-500 hover:bg-white transition duration-300 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm text-center">
                        See All Packages -&gt;
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default PopularPackage