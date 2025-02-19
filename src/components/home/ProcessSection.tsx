import { Check } from "lucide-react";
export function ProcessSection() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center space-x-8 mb-16">
                    <div className="text-center">
                        <div className="w-40 h-1 bg-red-500"></div>
                        <div className="mt-2 text-sm text-gray-600">Goverment Approved</div>
                    </div>
                    <div className="text-center">
                        <div className="w-40 h-1 bg-gray-200"></div>
                        <div className="mt-2 text-sm text-gray-600">No Hidden Costs</div>
                    </div>
                    <div className="text-center">
                        <div className="w-40 h-1 bg-gray-200"></div>
                        <div className="mt-2 text-sm text-gray-600">
                            Fast, Easy & Secure
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                            alt="Visa Process"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div>
                        <div className="text-sm text-gray-600 mb-2">GETTING A VISA</div>
                        <h2 className="text-3xl font-bold mb-8">
                            We make the visa process faster
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Semper lacus cursus porta, feugiat primis ligula risus auctor and
                            rhoncus in ultrice ligula purus ipsum primis in cubilia augue
                            vitae laoreet augue in cubilia augue egestas an ipsum turpis
                        </p>
                        <h3 className="font-semibold mb-4">Cubilia augue vitae laoreet</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <Check className="text-red-500 mt-1" size={20} />
                                <p className="text-gray-600">
                                    Fringilla risus nec, luctus mauris orci auctor purus euismod
                                    at pretium purus pretium ligula rutrum viverra tortor sapien
                                    sodales congue magna undo pretium purus pretium an magnis
                                    nulla
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <Check className="text-red-500 mt-1" size={20} />
                                <p className="text-gray-600">
                                    Quaerat sodales sapien undo euismod risus auctor egestas augue
                                    mauri undo viverra tortor sapien sodales sapien and vitae
                                    donec dolor sapien augue erat iaculis euismod
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
