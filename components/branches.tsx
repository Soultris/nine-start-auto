import React from 'react';

const hours = [
  { day: 'Monday', time: '10 A.M - 6 P.M' },
  { day: 'Tuesday', time: '10 A.M - 6 P.M' },
  { day: 'Wednesday', time: '10 A.M - 6 P.M' },
  { day: 'Thursday', time: '10 A.M - 6 P.M' },
  { day: 'Friday', time: '10 A.M - 6 P.M' },
  { day: 'Saturday', time: '10 A.M - 6 P.M' },
  { day: 'Sunday', time: 'Appointment Only' },
];

function HoursTable() {
  return (
    <div
      className="rounded-xl p-5 mt-4 bg-card-light border border-border-light"
    >
      <h4 className="text-sm font-semibold text-black mb-4">Open Hours</h4>
      <div className="flex flex-col gap-2">
        {hours.map(({ day, time }) => (
          <div key={day} className="flex justify-between items-center">
            <span className="text-sm font-normal text-black">{day}</span>
            <span className="text-sm font-light text-muted">
              {time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapEmbed({ src }: { src: string }) {
  return (
    <div className="w-full h-[370px] rounded-2xl overflow-hidden">
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function BranchInfo({ name, desc }: { name: string; desc: string }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-brand-gold mb-2">{name}</h3>
      <p className="text-sm font-light text-muted leading-relaxed">{desc}</p>
      <HoursTable />
    </div>
  );
}

export default function Branches() {
  const desc =
    'Professional auto brokerage services Professional auto brokerage services';

  return (
    <section aria-label="Our Branches" className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 font-[montserrat]">
        {/* Header */}
        <h2 className="text-4xl font-medium text-black mb-10">
          OUR BRANCHES
        </h2>

        {/* Branch 1 — Map left, Info right */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 mb-14 items-start">
          <MapEmbed src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6061.475564040487!2d-74.10994182221374!3d40.56946750365793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2494e126b58b9%3A0x2eb53cd0157915a!2s2545%20Hylan%20Blvd%2C%20Staten%20Island%2C%20NY%2010306!5e0!3m2!1sen!2sus!4v1781591759274!5m2!1sen!2sus" />
          <BranchInfo name="Southshore's Nine Star Auto" desc={desc} />
        </div>

        {/* Branch 2 — Info left, Map right */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-start">
          <BranchInfo name="Nine Star Auto" desc={desc} />
          <MapEmbed src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.1698074152046!2d-74.1303501!3d40.626137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24dd0b65d568d%3A0xed3f3530cc8bcc38!2sNine%20Star%20Auto!5e0!3m2!1sen!2slk!4v1781591825380!5m2!1sen!2slk" />
        </div>
      </div>
    </section>
  );
}