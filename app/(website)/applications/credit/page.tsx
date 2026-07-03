import CreditApplication from "@/components/Applications/creditApplication";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Application",
  description: "Apply for a personal car lease credit pre-approval online. Quick, secure, and hassle-free processing.",
};

export default function CreditApplicationPage() {
  return (
    <>
      <CreditApplication />
      <Footer />
    </>
  );
}