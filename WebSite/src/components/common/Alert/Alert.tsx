import React, { useEffect, useState } from 'react';

interface AlertProps {
    message: string;
    type: 'success' | 'error';
    duration?: number;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, duration = 5000, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true); // trigger fade-in

        const timer = setTimeout(() => {
            setVisible(false); // trigger fade-out
            setTimeout(() => {
                onClose(); // call onClose after animation finishes
            }, 300); // match transition duration
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`fixed z-50 top-15 left-1/2 transform -translate-x-1/2 mt-4 px-6 py-4 rounded shadow-lg border transition-all duration-300 ease-in-out
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                ${type === 'success'
                    ? 'bg-green-100 border-green-400 text-green-700'
                    : 'bg-red-100 border-red-400 text-red-700'
                }
            `}
        >
            <span>{message}</span>
        </div>
    );
};

export default Alert;
