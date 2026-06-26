import Gallery, { SanityGalleryImage } from "@/components/Gallery/GalleryPage";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Gallery | Nine Star Auto",
  description: "Complete our secure business financing application online. Fast and easy credit pre-approval.",
};

const GALLERY_QUERY = `*[_type == "gallery"] | order(order asc, _createdAt desc)`;

export default async function GalleryPage() {
  const { data: images } = await sanityFetch({ query: GALLERY_QUERY });

  return (
    <>
      <Gallery initialImages={images as SanityGalleryImage[]} />
      <Footer />
    </>
  );
}