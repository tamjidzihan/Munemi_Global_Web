import axios from "axios";

const SMS_TOKEN = import.meta.env.VITE_SMS_TOKEN

export const sendConfirmationSms = async (mobile: string, message: string) => {
    try {
        const smsParams = new URLSearchParams();
        smsParams.append('token', SMS_TOKEN); // Replace with your actual token
        smsParams.append('to', mobile);
        smsParams.append('message', message);
        const response = await axios.post('https://api.bdbulksms.net/api.php', smsParams);
        console.log('SMS sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};