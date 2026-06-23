import { NavBar } from "@/components/NavBar";
import PopupManager from "@/components/Pop-ups/PopupManager";
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
      <SanityLive />
    </>
  );
}
