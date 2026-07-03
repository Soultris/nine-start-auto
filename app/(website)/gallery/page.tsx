import Gallery, { SanityGalleryImage } from "@/components/Gallery/GalleryPage";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photos of our recent car deliveries and leased vehicles. See the wide range of makes and models we deliver to happy customers in New York.",
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