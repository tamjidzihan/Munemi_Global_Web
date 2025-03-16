import React, { useState } from "react";
import { Appointment } from "../../../hooks/useAppointments";

type CreateAppointmentModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    addNewAppointment: (newAppointment: Appointment) => void;
    createAppointment: (appointment: Appointment) => Promise<void>;
};

const CreateAppointmentsModal = ({
    isOpen,
    closeModal,
    addNewAppointment,
    createAppointment,
}: CreateAppointmentModalProps) => {
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
            _id: "",
        };

        try {
            await createAppointment(newAppointment);
            addNewAppointment(newAppointment);
            closeModal();
        } catch (error) {
            console.log(error)
            alert("Failed to create appointment.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    if (!isOpen) return null;

    return (
        <div className=" py-4 inset-0 flex items-center justify-center bg-gray-200  shadow-2xl">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                <h3 className="text-xl font-semibold mb-4">Create New Appointment</h3>
                <form onSubmit={handleSubmit} className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Appointment Office</label>
                        <select
                            id="countries"
                            value={appointmentOffice}
                            onChange={(e) => setAppointmentOffice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={loading}
                            required
                        >
                            <option value="" disabled selected>Choose a country</option>
                            <option value="Bangladesh">Bangladesh</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={3}
                            disabled={loading}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            ) : (
                                "Create Appointment"
                            )}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default CreateAppointmentsModal;
