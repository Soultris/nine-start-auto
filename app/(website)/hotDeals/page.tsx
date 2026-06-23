import Footer from "@/components/footer";
import HotDeals from "@/components/HotDeals/HotDeals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hot Deals | Nine Star Auto",
  description: "Complete our secure business financing application online. Fast and easy credit pre-approval.",
};

export default function HotDealsPage() {
  return (
    <>
      <HotDeals />
      <Footer />
    </>
  );
}