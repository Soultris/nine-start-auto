import React from 'react';

export default function HowItWorks() {
    const steps = [
        {
            number: '1',
            title: 'Tell us the vehicle you want',
            desc: 'Share your desired make, model, year, and features. Whether it’s a family SUV, an efficient commuter, or a luxury ride, we start by understanding exactly what you need.',
        },
        {
            number: '2',
            title: 'We locate the best available options',
            desc: 'Our experts leverage an extensive network of dealerships and private sellers to track down the exact vehicle that matches your criteria and budget.',
        },
        {
            number: '3',
            title: 'We negotiate competitive pricing',
            desc: 'We handle all the haggling on your behalf. Using our industry relationships and market knowledge, we secure the lowest possible price with no hidden fees.',
        },
        {
            number: '4',
            title: 'You receive your vehicle hassle-free',
            desc: 'Complete the paperwork seamlessly and take delivery of your new car. We make the final steps smooth so you can hit the road with peace of mind.',
        },
    ];

    return (
        <section aria-label="How it works" className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat]">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl font-medium text-black mb-4 tracking-wider">HOW IT WORKS</h2>
                    <p className="text-muted text-md max-w-3xl leading-relaxed font-light">
                        A simple, stress-free process designed to get you behind the wheel of your next vehicle with confidence and ease. Let us guide you through every step.
                    </p>
                </div>

                {/* Steps - responsive grid */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="bg-card-light border border-border-light rounded-2xl p-6 flex flex-col justify-start min-h-[220px] hover:shadow-md hover:border-gray-300 transition-all duration-300 w-full"
                        >
                            {/* Number */}
                            <span className="text-brand-gold text-5xl font-medium block mb-4">
                                {step.number}
                            </span>

                            {/* Title */}
                            <h3 className="text-base font-medium text-black mb-2 leading-snug">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-caption text-sm leading-relaxed font-light mt-1">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}