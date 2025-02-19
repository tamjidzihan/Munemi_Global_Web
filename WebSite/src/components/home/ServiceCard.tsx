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
        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <div className="mb-4">
                <Icon size={40} className="text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
