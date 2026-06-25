import Footer from "@/components/footer";
import HotDeals from "@/components/HotDeals/HotDeals";
import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Hot Deals | Nine Star Auto",
  description: "Complete our secure business financing application online. Fast and easy credit pre-approval.",
};

const HOT_DEALS_QUERY = `*[_type == "hotDeals"] | order(_createdAt desc)`;

export default async function HotDealsPage() {
  const { data: deals } = await sanityFetch({ query: HOT_DEALS_QUERY });

  return (
    <>
      <HotDeals initialDeals={deals} />
      <Footer />
    </>
  );
}