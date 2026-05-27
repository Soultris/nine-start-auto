import { HeroSection } from "@/components/heroSection";

export default function Home() {
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-between p-15 pl-25 bg-cover  bg-center"
      style={{ backgroundImage: "url('/HomeSection/homeMainImg.png')" }}
    >
      <HeroSection />
    </main>
  );
}
