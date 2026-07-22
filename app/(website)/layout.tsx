import { NavBar } from "@/components/NavBar";
import PopupManager from "@/components/Pop-ups/PopupManager";
import ZohoSalesIQProvider from "@/components/chat/ZohoSalesIQProvider";
import { SanityLive } from "@/sanity/lib/live";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
      <PopupManager />
      {/* Loads the Zoho SalesIQ embed script once globally for all pages */}
      <ZohoSalesIQProvider />
      <SanityLive />
    </>
  );
}

