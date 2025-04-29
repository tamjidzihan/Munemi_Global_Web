import { PackageImageProps } from "../../../hooks/usePackage";


interface PackageGalleryProps {
    images: PackageImageProps[];
}


export const PackageGallery = ({ images }: PackageGalleryProps) => {
    const displayedImages = images.slice(0, 5);
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px]">
            {displayedImages.map((image, index) => (
                <div key={image.id} className={index === 0 ? ' col-span-2 row-span-2' : 'col-span-1 row-span-1'}>
                    <div className=" overflow-hidden">
                        <img
                            src={`${import.meta.env.VITE_APICLIENT}/uploads/${image.url}`}
                            alt={`Travel package image ${image.id}`}
                            className="w-full h-full object-cover rounded-md hover:scale-105 duration-300"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
