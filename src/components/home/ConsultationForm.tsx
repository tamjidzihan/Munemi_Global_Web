export function ConsultationForm() {
    return (
        <section className="relative py-20 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                    <p className="text-sm mb-4">FREE 24/7 SUPPORT</p>
                    <h2 className="text-4xl font-bold mb-6">
                        Get Free & Quality
                        <br />
                        Online Consultation
                    </h2>
                    <p className="mb-4">
                        Euismod risus auctor egestas augue mauri viverra euismod tortor
                        eugiat a mauris placerat
                    </p>
                    <p className="text-sm text-gray-300">
                        Fringilla risus nec, luctus mauris orci auctor purus euismod and
                        pretium purus at pretium ligula rutrum viverra tortor sapien sodales
                        and primis ligula risus auctor egestas augue mauri viverra tortor in
                        iaculis placerat eugiat mauris ipsum viverra tortor gravida
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-6">Request Free Consultation</h3>
                    <form className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Enter Your Phone Number"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <select className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                                <option value="">Select Visa</option>
                                <option value="student">Student Visa</option>
                                <option value="work">Work Visa</option>
                                <option value="business">Business Visa</option>
                                <option value="tourist">Tourist Visa</option>
                            </select>
                        </div>
                        <div>
                            <select className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                                <option value="">Visa For</option>
                                <option value="individual">Individual</option>
                                <option value="family">Family</option>
                                <option value="group">Group</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-colors"
                        >
                            SEND REQUEST
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
