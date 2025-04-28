import { useState, useEffect } from 'react';
import { CalendarIcon, MapPin, UsersIcon } from 'lucide-react';
import { PackageImageProps } from '../../hooks/usePackage';
import { Link } from 'react-router-dom';

export interface PackageMenuCardProps {
    id: string;
    destination: string;
    image: PackageImageProps[];
    duration?: string;
    people?: string;
    title: string;
    price?: string;
    priceSubtext: string;
}

const PackageMenuCard: React.FC<PackageMenuCardProps> = ({
    id,
    destination,
    image,
    duration,
    people,
    title,
    price,
    priceSubtext,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Change image every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [image.length]);

    return (
        <div className="max-w-md rounded-xl overflow-hidden shadow-lg bg-white">
            {/* Card Image Container */}
            <div className="relative h-58">
                {image.length > 0 && (
                    image.map((img, index) => (
                        <img
                            key={index}
                            src={`${import.meta.env.VITE_APICLIENT}/uploads/${img.url}`}
                            alt={`${destination} landscape`}
                            className={` 
                    absolute top-0 left-0 w-full h-full object-cover 
                    transition-all duration-2500 ease-in-out
                    ${index === currentIndex ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 z-0'}`}
                        />
                    ))
                )}
                {/* Destination Badge */}
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white font-bold px-3 py-1 z-20 rounded-md flex items-center">
                    <MapPin size={15} className="text-green-500 mr-2" />
                    <span>{destination}</span>
                </div>
            </div>
            {/* Card Content */}
            <div className="p-4">
                {/* Trip Info */}
                <div className="flex mb-2">
                    <div className="flex items-center mr-4">
                        <CalendarIcon size={16} className="mr-1" />
                        <span className="text-gray-600 text-sm">{duration}</span>
                    </div>
                    <div className="flex items-center">
                        <UsersIcon size={16} className="mr-1" />
                        <span className="text-gray-600 text-sm">{people}</span>
                    </div>
                </div>
                {/* Title */}
                <Link to={`/package/${id}`}>
                    <h3 className="font-medium text-xl text-midnight mb-2 hover:text-violet-900">{title}</h3>
                </Link>
                {/* Price */}
                <div className="mt-2">
                    <span className="text-green-600 font-bold text-xl">৳ {price}</span>
                    <p className="text-gray-500 text-sm">{priceSubtext}</p>
                </div>
            </div>
        </div>
    );
};

export default PackageMenuCard;