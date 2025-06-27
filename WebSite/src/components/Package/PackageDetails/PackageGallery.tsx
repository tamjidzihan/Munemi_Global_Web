import { PackageImageProps } from "../../../hooks/usePackage";

interface PackageGalleryProps {
    images: PackageImageProps[];
}

export const PackageGallery = ({ images }: PackageGalleryProps) => {
    const displayedImages = images.slice(0, 5);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 h-auto">
            {displayedImages.map((image, index) => (
                <div
                    key={image.id}
                    className={index === 0 ? 'col-span-2 row-span-2 ' : 'col-span-1 row-span-1'}
                >
                    <div className="overflow-hidden">
                        <img
                            src={`${import.meta.env.VITE_APICLIENT}/uploads/${image.url}`}
                            alt={`Travel package image ${image.id}`}
                            className="w-full max-h-95 object-contain rounded-md hover:scale-105 duration-300"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
