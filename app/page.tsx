import { HeroSection } from "@/components/heroSection";
import PopularDeals from "@/components/popularDeals";
import OurServices from "@/components/ourServices";
import WhyChooseUs from "@/components/whyChooseUs";
import HowItWorks from "@/components/howItWorks";
import AboutUs from "@/components/aboutUs";
import Testimonial from "@/components/testimonial";
import Gallery from "@/components/gallery";
import ContactUs from "@/components/contactUs";
import Branches from "@/components/branches";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div 
        className="w-full min-h-screen flex items-center bg-cover bg-center lg:bg-right pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden"
        style={{ backgroundImage: "url('/HomeSection/homeMainImg.png')" }}
      >
        <HeroSection />
      </div>
      <PopularDeals />
      <OurServices />
      <WhyChooseUs />
      <HowItWorks />
      <AboutUs />
      <Testimonial />
      <Gallery />
      <ContactUs />
      <Branches />
      <Footer />
    </main>
  );
}
