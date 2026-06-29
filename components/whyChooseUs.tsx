import React from 'react';
import { Shield, Coins, Clock, Sliders } from 'lucide-react';

export default function WhyChooseUs() {
    const reasons = [
        {
            icon: <Shield className="w-5 h-5 text-white" />,
            title: 'Professional auto brokerage services',
            desc: 'We guarantee a secure, transparent, and legally compliant vehicle purchasing process.',
        },
        {
            icon: <Coins className="w-5 h-5 text-white" />,
            title: 'Competitive pricing and transparent process',
            desc: 'Get the best market value with zero hidden fees and clear upfront pricing.',
        },
        {
            icon: <Clock className="w-5 h-5 text-white" />,
            title: 'Save time and avoid dealership pressure',
            desc: 'We handle all the negotiations and paperwork, making your experience entirely hassle-free.',
        },
        {
            icon: <Sliders className="w-5 h-5 text-white" />,
            title: 'Personalized vehicle search based on your needs',
            desc: 'Our experts curate vehicle options specifically tailored to your lifestyle and budget.',
        },
    ];

    return (
        <section aria-label="Why choose us" className="w-full bg-[#212121] py-12 sm:py-14 lg:py-20 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Content Column */}
                    <div className="lg:col-span-8 flex flex-col gap-8 lg:gap-10">
                        {/* Header */}
                        <div>
                            <h2 className="text-[28px] leading-tight sm:text-3xl lg:text-4xl font-normal text-white mb-3 lg:mb-4 tracking-wider">
                                WHY CHOOSE US?
                            </h2>
                            <p className="text-muted text-sm sm:text-[15px] lg:text-md max-w-2xl leading-relaxed">
                                Experience the Nine Star Auto difference with our commitment to quality, transparency, and exceptional customer service.
                            </p>
                        </div>

                        {/* Mobile/Tablet Image - shown above reasons, hidden on desktop */}
                        <div className="lg:hidden">
                            <div className="relative overflow-hidden rounded-xl border border-[#2E2E2E]">
                                <img
                                    src="/WhyChooseUs/whycooseUs.png"
                                    alt="Happy woman receiving car key"
                                    className="w-full h-70 sm:h-70 object-cover"
                                />
                            </div>
                        </div>

                        {/* Grid of Reasons */}
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-4 sm:gap-x-8 lg:gap-x-12 gap-y-6 sm:gap-y-8 lg:gap-y-10">
                            {reasons.map((item, idx) => (
                                <div key={idx} className="flex flex-col items-start gap-2.5 sm:gap-3 lg:gap-4">
                                    {/* Circle Icon Container */}
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#3E3E3E] flex items-center justify-center shadow-inner flex-shrink-0 [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-[18px] sm:[&_svg]:h-[18px] lg:[&_svg]:w-5 lg:[&_svg]:h-5">
                                        {item.icon}
                                    </div>
                                    {/* Text Details */}
                                    <div>
                                        <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-1 lg:mb-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image Column - desktop only, unchanged */}
                    <div className="hidden lg:flex lg:col-span-4 justify-center lg:justify-end">
                        <div className="relative overflow-hidden rounded-2xl border border-[#2E2E2E] max-w-md lg:max-w-full mt-30">
                            <img
                                src="/WhyChooseUs/whycooseUs.png"
                                alt="Happy woman receiving car key"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}