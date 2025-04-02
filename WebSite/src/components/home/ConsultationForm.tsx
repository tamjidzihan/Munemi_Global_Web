import { useState } from "react";
import image9 from "../../assets/image_9.jpg"
import useAppointments, { Appointment } from "../../hooks/useAppointments";

export function ConsultationForm() {
    const { createAppointment } = useAppointments()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [appointmentOffice, setAppointmentOffice] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Track loading state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !lastName || !phone || !email || !city || !appointmentOffice) {
            alert("All fields are required.");
            return;
        }
        setLoading(true); // Start loading

        const newAppointment: Appointment = {
            firstName,
            lastName,
            phone,
            email,
            city,
            appointmentOffice,
            message,
            updatedAt: "",
            id: "",
        };

        try {
            await createAppointment(newAppointment);
        } catch (error) {
            console.log(error)
            alert("Failed to create appointment.");
        } finally {
            setLoading(false); // Stop loading
            setFirstName('')
            setLastName('')
            setPhone('')
            setEmail('')
            setCity('')
            setAppointmentOffice("")
            setMessage('')
        }
    };

    return (
        <section className="relative py-24 bg-cover bg-no-repeat" style={{ backgroundImage: `url('${image9}')` }}>
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
                    <p className="text-lg text-gray-200 leading-relaxed">
                        Relax! Our counselors are available to chat with you online!
                    </p>
                    <p className="text-gray-300 max-w-md">
                        If our clients need assistance and are unable to come into or call our office,
                        we can still provide our services over the internet via live text chat.
                    </p>
                </div>

                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl space-y-8 transition-all duration-300 hover:shadow-3xl">
                    <h3 className="text-3xl font-bold text-gray-900">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Book An Appointment
                        </span>
                    </h3>

                    <form onSubmit={handleSubmit} className={`space-y-6 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                        <div className=" grid grid-cols-2 space-x-5">
                            <div className="col-span-1">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    disabled={loading}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="col-span-1">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    disabled={loading}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                disabled={loading}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                required
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                disabled={loading}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Appointment Office</label>
                            <select
                                value={appointmentOffice}
                                onChange={(e) => setAppointmentOffice(e.target.value)}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                required
                            >
                                <option value="" disabled>Choose a country</option>
                                <option value="Bangladesh">Bangladesh</option>
                            </select>
                        </div>
                        <div>
                            <textarea
                                placeholder="How can we help you?"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={loading}
                                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            ></textarea>
                        </div>
                        <button disabled={loading} className="w-full cursor-pointer py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                            Send Request
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}