import { motion } from "framer-motion";
import service from "../../assets/services.jpg";

export function ConsultationSection() {
    const services = [
        "Umrah Packages",
        "Hajj Packages",
        "Tour Packages",
        "Visa Service",
        "Air Tickets",
        "Student VISA",
        "Hotel Booking",
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-200">
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image Section with Animation */}
                <motion.div
                    className="relative overflow-hidden rounded-lg shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img
                        src={service}
                        alt="Consultation"
                        className="rounded-lg object-cover w-full"
                    />
                </motion.div>

                {/* Text & Services Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-6xl font-bold text-midnight mb-6 leading-tight">
                        Our Premium Services
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Experience seamless travel with our exclusive services tailored to your needs.
                    </p>

                    <ul className="space-y-4">
                        {services.map((service, index) => (
                            <motion.li
                                key={index}
                                className="flex items-center gap-4 text-lg text-gray-700 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                {service}
                            </motion.li>
                        ))}
                    </ul>

                    <motion.button
                        className="mt-8 bg-red-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition-all"
                        whileHover={{ scale: 1.05 }}
                    >
                        GET STARTED
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
