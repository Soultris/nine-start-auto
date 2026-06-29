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
    <section id="services" aria-label="Our services" className="w-full bg-white py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 font-[montserrat]">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-3 sm:mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-muted text-sm sm:text-[15px] lg:text-md max-w-3xl leading-relaxed font-light">
            Discover our comprehensive range of automotive services designed to make your car-buying and ownership experience seamless.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card-light border border-border-light rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] hover:shadow-md hover:border-gray-300 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 flex items-center justify-start">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-semibold text-black leading-snug mt-4 sm:mt-6">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}