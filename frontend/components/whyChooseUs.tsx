import React from 'react';
import { Shield, Coins, Clock, Sliders } from 'lucide-react';

export default function WhyChooseUs() {
    const reasons = [
        {
            icon: <Shield className="w-5 h-5 text-white" />,
            title: 'Professional auto brokerage services',
            desc: 'Professional auto brokerage services Professional auto brokerage services',
        },
        {
            icon: <Coins className="w-5 h-5 text-white" />,
            title: 'Competitive pricing and transparent process',
            desc: 'Professional auto brokerage services Professional auto brokerage services',
        },
        {
            icon: <Clock className="w-5 h-5 text-white" />,
            title: 'Save time and avoid dealership pressure',
            desc: 'Professional auto brokerage services Professional auto brokerage services',
        },
        {
            icon: <Sliders className="w-5 h-5 text-white" />,
            title: 'Personalized vehicle search based on your needs',
            desc: 'Professional auto brokerage services Professional auto brokerage services',
        },
    ];

    return (
        <section aria-label="Why choose us" className="w-full bg-[#161616] py-20 text-white">
            <div className="max-w-7xl mx-auto px-6 font-[montserrat]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Content Column */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {/* Header */}
                        <div>
                            <h2 className="text-4xl font-normal text-white mb-4 tracking-wider">
                                WHY CHOOSE US?
                            </h2>
                            <p className="text-muted text-md max-w-2xl leading-relaxed">
                                Professional auto brokerage services Professional auto brokerage services Professional auto brokerage
                            </p>
                        </div>

                        {/* Grid of Reasons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {reasons.map((item, idx) => (
                                <div key={idx} className="flex flex-col items-start gap-4">
                                    {/* Circle Icon Container */}
                                    <div className="w-12 h-12 rounded-full bg-[#3E3E3E] flex items-center justify-center shadow-inner">
                                        {item.icon}
                                    </div>
                                    {/* Text Details */}
                                    <div>
                                        <h3 className="text-lg font-medium text-white mb-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image Column */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-end">
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
