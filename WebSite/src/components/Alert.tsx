import React, { useEffect } from 'react';

interface AlertProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info'; // Different alert types
    onClose: () => void; // Function to handle closing the alert
    timeout?: number; // Optional timeout prop (in milliseconds)
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose, timeout = 5000 }) => {
    const alertStyles = {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800',
        info: 'bg-blue-100 text-blue-800',
    };

    useEffect(() => {
        // Automatically close the alert after the specified timeout
        const timer = setTimeout(() => {
            onClose();
        }, timeout);

        // Cleanup the timer if the component is unmounted or timeout changes
        return () => clearTimeout(timer);
    }, [onClose, timeout]);

    return (
        <div
            className={`flex items-center justify-between p-4 mb-4 border rounded-lg ${alertStyles[type]} border-${type}-200`}
            role="alert"
        >
            <div className="flex items-center">
                <span className="mr-2">
                    {/* You can customize icons based on alert type here */}
                    {type === 'success' && '✔️'}
                    {type === 'error' && '❌'}
                    {type === 'warning' && '⚠️'}
                    {type === 'info' && 'ℹ️'}
                </span>
                <span>{message}</span>
            </div>
            <button
                onClick={onClose}
                className="text-xl font-bold text-gray-500 hover:text-gray-700"
            >
                ×
            </button>
        </div>
    );
};

export default Alert;
