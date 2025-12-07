"use client";

import { useState } from "react";
import Image from "next/image";
import type { ChefDetail as ChefDetailType } from "@/lib/api";

export default function ChefDetail({ chef }: { chef: ChefDetailType }) {
    const {
        name,
        profilePicture,
        experience,
        foodOrigin,
        expertise,
        basePrice,
        about,
        specialties,
        dishGallery,
    } = chef;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    // Gallery navigation
    const nextImage = () => {
        if (dishGallery && dishGallery.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % dishGallery.length);
        }
    };

    const prevImage = () => {
        if (dishGallery && dishGallery.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + dishGallery.length) % dishGallery.length);
        }
    };

    // FAQ data
    const faqItems = [
        { question: "Menu 1", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { question: "Menu 2", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { question: "Menu 3", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { question: "Menu 4", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { question: "Menu 5", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    ];

    // Current date
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const today = currentDate.getDate();

    return (
        <div className="bg-white">
            {/* Hero Section - Split Layout with Container */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                    {/* Left: Chef Info */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl font-bold text-lapis mb-4">{name}</h1>
                        <p className="text-battleship leading-relaxed mb-6">
                            {about || `Specialist in ${foodOrigin} cuisine with ${experience} years of experience.`}
                        </p>

                        {/* Info badges */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-ash rounded-sm"></div>
                                <span className="text-battleship">{experience} years experience</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-ash rounded-sm"></div>
                                <span className="text-battleship">{foodOrigin}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-ash rounded-sm"></div>
                                <span className="text-battleship">{expertise}</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <p className="text-sm text-battleship mb-1">Start From</p>
                            <p className="text-4xl font-bold text-lapis">
                                €{basePrice} <span className="text-base text-battleship/60">/pp</span>
                            </p>
                        </div>
                    </div>

                    {/* Right: Hero Image */}
                    <div className="bg-lapis relative min-h-[400px] lg:min-h-full">
                        <Image
                            src={profilePicture || "/placeholder-chef.png"}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/*/!* Gallery Section with small images on left *!/*/}
            {/*{dishGallery && dishGallery.length > 0 && (*/}
            {/*    <div className="grid grid-cols-1 lg:grid-cols-2">*/}
            {/*        /!* Left: Two small images *!/*/}
            {/*        <div className="grid grid-cols-2 gap-0">*/}
            {/*            {dishGallery.slice(0, 2).map((imageUrl, index) => (*/}
            {/*                <div key={index} className="relative aspect-video bg-lapis">*/}
            {/*                    <Image*/}
            {/*                        src={imageUrl}*/}
            {/*                        alt={`Gallery ${index + 1}`}*/}
            {/*                        fill*/}
            {/*                        className="object-cover"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*        /!* Right: Placeholder for balance *!/*/}
            {/*        <div className="hidden lg:block"></div>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/* Main Content Section */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Column */}
                    <div className="p-8 lg:p-12">
                    {/* About Section */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-lapis mb-6">About {name}</h2>
                        <p className="text-battleship leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat elit sed pretium, egestas sed sit.
                            Fames tincidunt rhoncus viverra eu ut scelerisque. Erat ero scelerisque adipiscing potenti sollicitudin
                            semper dapibus in ultrices. Sem vitae euismod in utrices egestas aliquam mi a arcu.
                        </p>
                        <p className="text-battleship leading-relaxed">
                            Purus diam est vitae faucibus enim. Ultricies nunc vel magna massa odio. Sed dictum condimentum mi ipsum
                            amet neque gravida quis sodales. Locus, elit pellentesque massa odio. Sed dictum condimentum sit quis.
                        </p>
                    </div>
                </div>

                {/* Right Column - Large Profile Image */}
                <div className="relative min-h-[400px] bg-lapis">
                    <Image
                        src={dishGallery?.[2] || profilePicture || "/placeholder-chef.png"}
                        alt={`${name} profile`}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            </div>

            {/* Chef's Specialties */}
            {specialties && specialties.length > 0 && (
                <div className="max-w-7xl mx-auto border-t border-ash/20">
                    <div className="p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-lapis mb-4">Chef&apos;s Specialties</h2>
                    <p className="text-battleship mb-8 leading-relaxed max-w-3xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat elit sed pretium, egestas sed sit.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
                        {specialties.map((specialty, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-4 h-4 mt-1 bg-ash rounded-sm flex-shrink-0"></div>
                                <span className="text-battleship">{specialty}</span>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            )}

            {/* Dish Gallery Carousel */}
            {dishGallery && dishGallery.length > 0 && (
                <div className="max-w-7xl mx-auto border-t border-ash/20">
                    <div className="p-8 lg:p-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-lapis">Dish Gallery</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={prevImage}
                                    className="w-10 h-10 rounded-lg border-2 border-ash hover:border-lapis flex items-center justify-center transition-colors"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-5 h-5 text-battleship" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="w-10 h-10 rounded-lg bg-lapis hover:bg-lapis/90 flex items-center justify-center transition-colors"
                                    aria-label="Next image"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {dishGallery.slice(currentImageIndex, currentImageIndex + 2).map((imageUrl, index) => (
                                <div key={index} className="relative aspect-video bg-lapis">
                                    <Image
                                        src={imageUrl}
                                        alt={`Dish ${currentImageIndex + index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Extra Informatie & Booking Section */}
            <div className="max-w-7xl mx-auto border-t border-ash/20">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: Extra Informatie */}
                    <div className="p-8 lg:p-12">
                        <h2 className="text-3xl font-bold text-lapis mb-6">Extra informatie</h2>
                        <p className="text-battleship leading-relaxed mb-4">
                            Chef {name} offers a personalized culinary experience, bringing restaurant-quality {foodOrigin} cuisine to your home.
                            With {experience} years of professional experience and expertise in {expertise}, every meal is crafted with attention
                            to detail and passion for authentic flavors.
                        </p>
                        <p className="text-battleship leading-relaxed mb-8">
                            All dishes are prepared fresh using high-quality ingredients, with customizable menus to accommodate dietary preferences
                            and restrictions. Whether you&apos;re hosting an intimate dinner or a larger gathering, {name} ensures an unforgettable
                            dining experience tailored to your needs.
                        </p>

                        {/* FAQ Accordion */}
                        <div className="space-y-3">
                            {faqItems.map((item, index) => (
                                <div key={index} className="border border-ash/30 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-tea/10 transition-colors"
                                    >
                                        <span className="text-battleship font-medium">{item.question}</span>
                                        <svg
                                            className={`w-5 h-5 text-battleship transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {expandedFaq === index && (
                                        <div className="px-4 py-3 bg-tea/5 border-t border-ash/30">
                                            <p className="text-battleship text-sm">{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Chef's Availability */}
                    <div className="p-8 lg:p-12 bg-white lg:border-l border-ash/20">
                        <h2 className="text-3xl font-bold text-lapis mb-6">Chef&apos;s Availability</h2>
                        <p className="text-battleship leading-relaxed mb-8">
                            Select your preferred date to book {name} for your event. All bookings start from €{basePrice} per person.
                        </p>

                    {/* Calendar */}
                    <div className="mb-8 border border-ash/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-battleship">Today - {currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="mb-3">
                            <select className="w-full px-3 py-2 border border-ash/30 rounded-lg text-battleship focus:outline-none focus:border-lapis">
                                <option>{currentMonth}</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                            <div className="text-battleship/60 font-medium py-2">Sun</div>
                            <div className="text-battleship/60 font-medium py-2">Mon</div>
                            <div className="text-battleship/60 font-medium py-2">Tue</div>
                            <div className="text-battleship/60 font-medium py-2">Wed</div>
                            <div className="text-battleship/60 font-medium py-2">Thu</div>
                            <div className="text-battleship/60 font-medium py-2">Fri</div>
                            <div className="text-battleship/60 font-medium py-2">Sat</div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((day) => (
                                <button
                                    key={day}
                                    className={`py-2 rounded-lg hover:bg-tea/30 transition-colors ${
                                        day === today ? 'bg-lapis text-white font-semibold' : 'text-battleship'
                                    }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-ash/30">
                            <span className="text-sm text-battleship">Selected Date</span>
                            <span className="text-battleship font-medium">{currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-lapis mb-4">Chef {name}</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-battleship mb-1">Your Email</label>
                                    <input
                                        type="email"
                                        placeholder="Lorem Ipsum"
                                        className="w-full px-4 py-2 border border-ash/30 rounded-lg text-battleship placeholder:text-lapis/40 focus:outline-none focus:border-lapis"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-battleship mb-1">Start From</label>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-lapis">${basePrice}</span>
                                        <span className="text-sm text-battleship/60">/pp</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-lapis hover:bg-lapis/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                            Book Now
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

