import React from 'react';

interface ServiceItem {
  icon: string;
  title: string;
}

export default function OurServices() {
  const services: ServiceItem[] = [
    {
      icon: '/OurServices/speedMeter.svg',
      title: 'Vehicle sourcing for new and pre-owned cars',
    },
    {
      icon: '/OurServices/carContract.svg',
      title: 'Lease and finance assistance',
    },
    {
      icon: '/OurServices/discount.svg',
      title: 'Dealer price negotiation expertise',
    },
    {
      icon: '/OurServices/global.svg',
      title: 'Nationwide vehicle access',
    },
    {
      icon: '/OurServices/deliver.svg',
      title: 'Convenient vehicle delivery options',
    },
  ];

  return (
    <section aria-label="Our services" className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 font-[montserrat]">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-medium text-black mb-4 tracking-tight">Our Services</h2>
          <p className="text-gray-400 text-sm max-w-3xl leading-relaxed font-light">
            Professional auto brokerage services Professional auto brokerage services Professional auto brokerage services auto brokerage services Professional auto brokerage services Professional auto brokerage services
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#F9F9F9] border border-[#EAEAEA] rounded-2xl p-6 flex flex-col justify-between min-h-[180px] hover:shadow-md hover:border-gray-300 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-start">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-black leading-snug mt-6">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

