import React from 'react';

export default function HowItWorks() {
    const steps = [
        {
            number: '1',
            title: 'Tell us the vehicle you want',
            desc: 'We are an organization of automotive professionals dedicated to delivering exceptional customer service with every vehicle',
        },
        {
            number: '2',
            title: 'We locate the best available options',
            desc: 'We are an organization of automotive professionals dedicated to delivering',
        },
        {
            number: '3',
            title: 'We negotiate competitive pricing',
            desc: 'We are an organization of automotive professionals dedicated to delivering exceptional customer service with every vehicle',
        },
        {
            number: '4',
            title: 'You receive your vehicle hassle-free',
            desc: 'We are an organization of automotive professionals dedicated to delivering',
        },
    ];

    return (
        <section aria-label="How it works" className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 font-[montserrat]">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl font-medium text-black mb-4 tracking-wider">HOW IT WORKS</h2>
                    <p className="text-muted text-md max-w-3xl leading-relaxed font-light">
                        Professional auto brokerage services Professional auto brokerage services Professional auto brokerage services Professional auto brokerage services Professional auto brokerage services Professional auto brokerage services
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="bg-card-light border border-border-light rounded-2xl p-6 flex flex-col justify-start min-h-[220px] hover:shadow-md hover:border-gray-300 transition-all duration-300"
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
