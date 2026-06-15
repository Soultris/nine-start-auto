import { HeroSection } from "@/components/heroSection";
import PopularDeals from "@/components/popularDeals";
import OurServices from "@/components/ourServices";
// import WhyChooseUs from "@/components/whyChooseUs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div 
        className="w-full bg-cover bg-center p-15 pl-25"
        style={{ backgroundImage: "url('/HomeSection/homeMainImg.png')" }}
      >
        <HeroSection />
      </div>
      <PopularDeals />
      <OurServices />
      {/* <WhyChooseUs /> */}
    </main>
      
  );
}
