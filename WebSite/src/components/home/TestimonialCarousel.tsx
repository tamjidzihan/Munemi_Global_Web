/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
    name: string;
    title: string;
    image?: string; // Image is optional, using placeholders
    quote: string;
}

const testimonialsData: Testimonial[] = [
    {
        name: "Fatima Rahman",
        title: "Umrah Package",
        quote:
            "Munemi Global made our spiritual journey seamless! Their attention to detail in the Umrah package was exceptional - from visa processing to luxury accommodations near Haram. The 24/7 support team truly cares about their clients' peace of mind. Will recommend to all Muslim travelers in Bangladesh!",
    },
    {
        name: "Rajesh Chowdhury",
        title: "Canada Student Visa",
        quote:
            "As a first-time international student, I was nervous about visa documentation. Munemi's experts guided me through every step - SOP preparation, financial proofs, and mock interviews. My visa approval came faster than expected! Their education counseling is worth every taka.",
    },
    {
        name: "Ayesha Siddiqa",
        title: "Malaysia Air Tickets",
        quote:
            "Unbeatable flight deals! Booked KLM business class tickets through Munemi at prices lower than airline websites. Their staff explained COVID regulations clearly and even helped arrange PCR tests. Perfect for frequent flyers seeking value-added service.",
    },
    {
        name: "Hiroshi Tanaka",
        title: "Japan Tour Package",
        quote:
            "Outstanding cultural tour coordination! As a Bangladeshi-Japanese family, we needed customized itineraries. Munemi arranged everything from cherry blossom routes to halal food restaurants. Their global hotel partnerships ensured 5-star comfort throughout Osaka and Tokyo.",
    },
    {
        name: "Nadia Islam",
        title: "UK Spouse Visa",
        quote:
            "Visa success on first attempt! Munemi's legal team prepared bulletproof documentation for my spouse visa application. They anticipated every Home Office requirement and even helped with NHS surcharge payments. Truly the gold standard in visa services.",
    },
    {
        name: "Abdullah Al-Mamun",
        title: "Hajj Package 2024",
        quote:
            "A life-changing experience organized perfectly! Munemi's Hajj package included premium Azizia accommodations, experienced mutawwif guides, and medical support. Their direct partnerships in Saudi Arabia eliminated all logistical worries. Already planning for 2025 with them!",
    },
];

const TestimonialCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonials = testimonialsData;

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === testimonials.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            goToNext();
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    if (!testimonials || testimonials.length === 0) {
        return <div className="p-8 text-center text-gray-500">No testimonials available.</div>;
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="max-w-7xl mx-auto px-4 my-20">
            <h2 className="text-3xl font-bold text-midnight text-center mb-4">
                What Our Clients Say
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Discover why thousands trust Munemi Global for their travel needs
            </p>

            <div className="flex items-center justify-center font-sans text-gray-100">
                <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-gray-200 bg-white">
                    <Quote className="absolute top-6 left-6 w-16 h-16 text-red-400 opacity-40 transform -translate-x-2 -translate-y-2" strokeWidth={1} />
                    <Quote className="absolute bottom-6 right-6 w-16 h-16 text-red-400 opacity-40 transform translate-x-2 translate-y-2 rotate-180" strokeWidth={1} />

                    <div className="relative z-10 flex flex-col items-center text-center min-h-[380px] sm:min-h-[350px] md:min-h-[320px] justify-between">
                        <div className="flex-grow flex flex-col items-center justify-center mb-6 w-full px-2">
                            <div className="mb-5 w-20 h-20 rounded-full border-2 border-red-600 flex items-center justify-center text-gray-400 text-xs overflow-hidden shadow-lg flex-shrink-0">
                                <span className="text-3xl font-bold text-midnight">
                                    {currentTestimonial.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-midnight mb-1 tracking-tight">
                                {currentTestimonial.name}
                            </h3>
                            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-5 uppercase tracking-wider">
                                {currentTestimonial.title}
                            </p>
                            <div className="flex space-x-1 mb-6 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} fill="currentColor" size={18} />
                                ))}
                            </div>
                            <p className="text-gray-800 italic leading-relaxed max-w-xl text-sm sm:text-base md:text-lg px-2 sm:px-4">
                                &ldquo;{currentTestimonial.quote}&rdquo;
                            </p>
                        </div>
                        <div className="flex justify-center space-x-2 mt-auto pt-4 flex-shrink-0">
                            {testimonials.map((_, slideIndex) => (
                                <button
                                    key={slideIndex}
                                    onClick={() => goToSlide(slideIndex)}
                                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ease-in-out ${currentIndex === slideIndex
                                        ? 'bg-blue-500 scale-125 ring-2 ring-red-500 ring-offset-2 ring-offset-blue-400'
                                        : 'bg-blue-400 hover:bg-blue-500'
                                        }`}
                                    aria-label={`Go to testimonial ${slideIndex + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-1 md:left-3 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-white text-white hover:text-gray-600 p-2 rounded-full transition-all duration-300 z-20 backdrop-blur-sm shadow-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-700 cursor-pointer"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-1 md:right-3 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-white text-white hover:text-gray-600 p-2 rounded-full transition-all duration-300 z-20 backdrop-blur-sm shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-700 cursor-pointer"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;