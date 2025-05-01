import { Link } from "react-router-dom";
import image8 from "../../assets/image_8.png"
import overseas from "../../assets/overseas.jpg"

export function OverseasEducation() {
    return (
        <section className="pt-15 text-white bg-center bg-cover bg-fixed" style={{ backgroundImage: `url('${overseas}')` }}>
            <div className=" relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img
                        src={image8}
                        alt="Students"
                        className="rounded-lg "
                    />
                </div>
                <div>
                    <div className="text-sm mb-2">OVERSEAS EDUCATION</div>
                    <div className="text-6xl font-bold mb-6">
                        Looking for Quality Abroad Education?
                    </div>
                    <p className="mb-8">
                        Unlock endless opportunities with world-class education. We connect you with top universities, guiding you through every step of your study abroad journey for a seamless and enriching experience.
                    </p>
                    <div className="mb-8">
                        <h3 className="font-semibold mb-4">
                            350+ Universities in 17 Countries:
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <img
                                src="https://flagcdn.com/w40/ca.png"
                                alt="Canada"
                                className="h-6"
                            />
                            <img
                                src="https://flagcdn.com/w40/au.png"
                                alt="Australia"
                                className="h-6"
                            />
                            <img
                                src="https://flagcdn.com/w40/us.png"
                                alt="USA"
                                className="h-6"
                            />
                            <img
                                src="https://flagcdn.com/w40/gb.png"
                                alt="UK"
                                className="h-6"
                            />
                            <img
                                src="https://flagcdn.com/w40/eu.png"
                                alt="Europe"
                                className="h-6"
                            />
                        </div>
                    </div>
                    <Link to={'/study-destination'} className="px-4 py-2 hover:text-red-600 text-white border border-red-500 bg-red-500 hover:bg-white transition duration-300 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center ">
                        LEARN MORE
                    </Link>
                </div>
            </div>
        </section>
    );
}
