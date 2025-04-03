import { useState } from "react";
import useAppointments, { Appointment } from "../../../hooks/useAppointments";
import Hero from "../../common/Hero/Hero";
import heroImage from "../../../assets/slide-2.jpg"

const AppointmentBookingForm = () => {
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
        <main className="w-full">
            <Hero bgImage={heroImage} heroName="Book An Appointment" />
            <div className=" max-w-4xl container place-self-center p-4 md:p-8  space-y-8 transition-all duration-300 hover:shadow-3xl">
                <h3 className="text-2xl font-bold text-midnight">
                    Fill out the form to book an appointment :
                </h3>
                <form onSubmit={handleSubmit} className={`space-y-6 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className=" grid grid-cols-1 md:grid-cols-2 space-x-5">
                        <div className="col-span-1 mb-4 md:mb-0">
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
        </main>
    )
}

export default AppointmentBookingForm