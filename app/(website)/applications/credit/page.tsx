import CreditApplication from "@/components/Applications/creditApplication";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Application | Nine Star Auto",
  description: "Complete our secure business financing application online. Fast and easy credit pre-approval.",
};

export default function CreditApplicationPage() {
  return (
    <>
      <CreditApplication />
      <Footer />
    </>
  );
}