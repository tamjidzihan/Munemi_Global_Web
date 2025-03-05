/* eslint-disable @typescript-eslint/no-explicit-any */
interface ServiceCardProps {
    title: string;
    description: string;
    icon: any;
    isActive?: boolean;
    bgImage: string
    onClick?: () => void;
}

export function ServiceMenuCard({
    title,
    description,
    icon: Icon,
    isActive = false,
    onClick,
    bgImage
}: ServiceCardProps) {
    return (
        <div
            className={`p-6 cursor-pointer border-2 rounded-lg transition-all duration-300 ${isActive
                ? 'border-red-500 bg-red-50 shadow-lg'
                : 'border-gray-200 hover:border-red-200'
                }`}
            style={{ backgroundImage: `url(${bgImage})` }}
            onClick={onClick}
            role="button"
        >
            <div className="flex flex-col place-self-center text-center items-start gap-4">
                <div className="px-15 py-4 place-self-center bg-red-100 hover:bg-red-50 rounded-full">
                    <Icon size={40} className={` ${isActive ? 'text-red-600' : 'text-red-400'}`} />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                    <p className="text-white text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
}