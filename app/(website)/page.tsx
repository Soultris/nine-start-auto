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
import { sanityFetch } from "@/sanity/lib/live";

const GALLERY_QUERY = `*[_type == "gallery"] | order(order asc, _createdAt desc)`;
const TESTIMONIAL_QUERY = `*[_type == "testimonial"] | order(order asc, _createdAt desc)`;
const POPULAR_DEALS_QUERY = `*[_type == "hotDeals" && isPopular == true] | order(_createdAt desc)`;

export default async function Home() {
  const { data: images } = await sanityFetch({ query: GALLERY_QUERY });
  const { data: testimonials } = await sanityFetch({ query: TESTIMONIAL_QUERY });
  const { data: popularDeals } = await sanityFetch({ query: POPULAR_DEALS_QUERY });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div 
        className="w-full min-h-screen flex items-center bg-cover bg-center lg:bg-right pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden"
        style={{ backgroundImage: "url('/HomeSection/homeMainImg.png')" }}
      >
        <HeroSection />
      </div>
      <PopularDeals initialDeals={popularDeals} />
      <OurServices />
      <WhyChooseUs />
      <HowItWorks />
      <AboutUs />
      <Testimonial initialTestimonials={testimonials} />
      <Gallery initialImages={images} />
      <ContactUs />
      <Branches />
      <Footer />
    </main>
  );
}
