import image9 from "../../assets/image_9.jpg"
import { Link } from "react-router-dom";

export function AppointmentBoking() {



    return (
        <section className="relative py-14 bg-cover bg-no-repeat" style={{ backgroundImage: `url('${image9}')` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/20"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                <div className="text-white space-y-6">
                    <p className="text-sm uppercase tracking-wider text-gray-200 font-semibold">
                        24/7 SUPPORT
                    </p>
                    <h2 className="text-5xl font-extrabold leading-tight">
                        Get Quality
                        <br />
                        <span className="bg-gradient-to-r from-indigo-500 to-blue-800 bg-clip-text text-transparent">
                            Online Consultation
                        </span>
                    </h2>
                    <p className="text-lg text-gray-100 leading-relaxed">
                        Relax! Our counselors are available to chat with you online!
                    </p>
                    <p className="text-gray-100 max-w-md">
                        If our clients need assistance and are unable to come into or call our office,
                        we can still provide our services over the internet via live text chat.
                    </p>
                </div>

                <div className="bg-white/95 backdrop-blur-sm  rounded-2xl shadow-2xl space-y-8 transition-all duration-300 hover:shadow-3xl">
                    <Link
                        to={'about/appointment-booking'}
                        className="inline-block w-full text-center cursor-pointer py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-3xl font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                        Book Appointment Now
                    </Link>
                </div>
            </div>
        </section>
    );
}