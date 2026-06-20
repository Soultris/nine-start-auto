import Image from 'next/image';
import Link from 'next/link';
// import { Facebook, Instagram } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Hot Deals', href: '#hot-deals' },
  { label: 'Our Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="w-full font-[montserrat]" style={{ backgroundColor: '#222222' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Col 1 — Logo + tagline */}
          <div className="flex flex-col gap-5">
            <Image
              src="/logo.png"
              alt="Nine Star Auto Logo"
              width={160}
              height={40}
              className="w-40 h-auto object-contain"
            />
            <p className="text-sm font-normal leading-relaxed text-muted">
              Professional auto brokerage <br /> services Professional auto <br /> brokerage
            </p>
            {/* <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white hover:text-brand-gold transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-brand-gold transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
            </div> */}
          </div>

          {/* Col 2 — Nav links */}
          <div className="flex flex-col gap-4 items-start">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-md font-medium transition-colors hover:text-brand-gold text-muted"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Col 3 — Contact info */}
          <div className="flex flex-col gap-6 items-start">
            {/* Phone */}
            <div>
              <p className="text-sm font-normal mb-2 text-muted">
                Contact Number
              </p>
              <div className="flex flex-col gap-1">
                <a
                  href="tel:7187090000"
                  className="text-sm font-medium text-white hover:text-brand-gold transition-colors block"
                >
                  718-709-0000
                </a>
                <a
                  href="tel:7186196277"
                  className="text-sm font-medium text-white hover:text-brand-gold transition-colors block"
                >
                  718-619-6277
                </a>
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm font-normal mb-2 text-muted">
                Contact Email
              </p>
              <a
                href="mailto:Sales@ninestarautony.com"
                className="text-sm font-medium text-white hover:text-brand-gold transition-colors block"
              >
                Sales@ninestarautony.com
              </a>
            </div>

            {/* Address */}
            <div>
              <p className="text-sm font-normal mb-2 text-muted">
                Address
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://maps.google.com/?q=3911+Amboy+Road,+Staten+Island,+NY+10308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white hover:text-brand-gold transition-colors leading-relaxed block"
                >
                  3911 Amboy Road,<br />
                  Staten Island, NY 10308
                </a>
                <a
                  href="https://maps.google.com/?q=2545+Hylan+Blvd,+Staten+Island,+NY+10306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white hover:text-brand-gold transition-colors leading-relaxed block"
                >
                  2545 Hylan Blvd,<br />
                  Staten Island, NY 10306
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
