import { UserIcon } from "lucide-react";

interface PassengerCounterProps {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    label: string;
    tag: string;
}

const PassengerCounter = ({
    value,
    onIncrement,
    onDecrement,
    label,
    tag
}: PassengerCounterProps) => {
    return (
        <>
            <span className=" text-xs text-gray-500">  {tag}</span>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                    <UserIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-lg font-medium">{label}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-1.5">
                    <button
                        onClick={onDecrement}
                        aria-label={`Decrease ${label}`}
                        className="text-lg text-gray-50 hover:text-gray-200 px-2 bg-red-500 rounded-full cursor-pointer"
                    >
                        −
                    </button>
                    <span className="w-4 text-center text-base">{value}</span>
                    <button
                        onClick={onIncrement}
                        aria-label={`Increase ${label}`}
                        className="text-lg text-gray-50 hover:text-gray-200 px-2 bg-green-500 rounded-full cursor-pointer"
                    >
                        +
                    </button>
                </div>
            </div>

        </>
    );
};

export default PassengerCounter;
