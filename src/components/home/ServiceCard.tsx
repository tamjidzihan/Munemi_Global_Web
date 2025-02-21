/* eslint-disable @typescript-eslint/no-explicit-any */
interface ServiceCardProps {
    title: string;
    description: string;
    icon: any;
}
export function ServiceCard({
    title,
    description,
    icon: Icon,
}: ServiceCardProps) {
    return (
        <div className="px-6 py-10 flex border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
            <div className="mb-4 pr-6 place-self-center">
                <Icon size={50} className="text-red-500" />
            </div>
            <div>
                <h3 className="text-xl text-midnight font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
}
