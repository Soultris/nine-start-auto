import Gallery from "@/components/Gallery/GalleryPage";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Nine Star Auto",
  description: "Complete our secure business financing application online. Fast and easy credit pre-approval.",
};

export default function GalleryPage() {
  return (
    <>
      <Gallery />
      <Footer />
    </>
  );
}