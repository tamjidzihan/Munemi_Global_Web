/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import amelieImage from "../../assets/amelie_peterson.jpg"
import boxerImage from "../../assets/Scott_boxer.jpg"
import evelynImage from "../../assets/Evelyn.jpg"

const testimonials = [
    {
        name: "Fatima Rahman",
        title: "Umrah Package",
        image: amelieImage,
        quote:
            "Munemi Global made our spiritual journey seamless! Their attention to detail in the Umrah package was exceptional - from visa processing to luxury accommodations near Haram. The 24/7 support team truly cares about their clients' peace of mind. Will recommend to all Muslim travelers in Bangladesh!",
    },
    {
        name: "Rajesh Chowdhury",
        title: "Canada Student Visa",
        image: amelieImage,
        quote:
            "As a first-time international student, I was nervous about visa documentation. Munemi's experts guided me through every step - SOP preparation, financial proofs, and mock interviews. My visa approval came faster than expected! Their education counseling is worth every taka.",
    },
    {
        name: "Ayesha Siddiqa",
        title: "Malaysia Air Tickets",
        image: boxerImage,
        quote:
            "Unbeatable flight deals! Booked KLM business class tickets through Munemi at prices lower than airline websites. Their staff explained COVID regulations clearly and even helped arrange PCR tests. Perfect for frequent flyers seeking value-added service.",
    },
    {
        name: "Hiroshi Tanaka",
        title: "Japan Tour Package",
        image: boxerImage,
        quote:
            "Outstanding cultural tour coordination! As a Bangladeshi-Japanese family, we needed customized itineraries. Munemi arranged everything from cherry blossom routes to halal food restaurants. Their global hotel partnerships ensured 5-star comfort throughout Osaka and Tokyo.",
    },
    {
        name: "Nadia Islam",
        title: "UK Spouse Visa",
        image: evelynImage,
        quote:
            "Visa success on first attempt! Munemi's legal team prepared bulletproof documentation for my spouse visa application. They anticipated every Home Office requirement and even helped with NHS surcharge payments. Truly the gold standard in visa services.",
    },
    {
        name: "Abdullah Al-Mamun",
        title: "Hajj Package 2024",
        image: evelynImage,
        quote:
            "A life-changing experience organized perfectly! Munemi's Hajj package included premium Azizia accommodations, experienced mutawwif guides, and medical support. Their direct partnerships in Saudi Arabia eliminated all logistical worries. Already planning for 2025 with them!",
    },
];

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
    };

    const handleNext = () => {
        setCurrentIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) handleNext();
        if (touchStart - touchEnd < -50) handlePrevious();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-midnight text-center mb-4">
                    What Our Clients Say
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Discover why thousands trust Munemi Global for their travel needs
                </p>

                <div
                    className="relative transition-transform duration-500 ease-in-out"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Testimonials Carousel */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.name}
                                className="min-w-full md:min-w-[calc(33.33%-1.5rem)] px-4 transition-all duration-300"
                            >
                                <div className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${index === currentIndex ? 'scale-105' : 'scale-95 opacity-75'
                                    }`}>
                                    <div className="flex items-center mb-6">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full object-cover border-4 border-primary/20"
                                        />
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-midnight">{testimonial.name}</h3>
                                            <p className="text-sm text-primary">{testimonial.title}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        {testimonial.quote}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Controls */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-full hidden md:flex justify-between px-4 ${isHovered ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-300`}>
                        <button
                            onClick={handlePrevious}
                            className="p-3 bg-white rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-3 bg-white rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}




