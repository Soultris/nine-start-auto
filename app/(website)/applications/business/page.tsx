import BusinessApplication from "@/components/Applications/businessApplication";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Application",
  description: "Complete our secure business financing application online. Fast and easy credit pre-approval.",
};

export default function BusinessApplicationPage() {
  return (
    <>
      <BusinessApplication />
      <Footer />
    </>
  );
}