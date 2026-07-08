import { NavBar } from "@/components/NavBar";
import PopupManager from "@/components/Pop-ups/PopupManager";
import FreshchatProvider from "@/components/chat/FreshchatProvider";
import ChatWidget from "@/components/ChatWidget";
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
      {/* Loads the Freshchat embed script once globally for all pages */}
      <FreshchatProvider />
      <ChatWidget />
      <SanityLive />
    </>
  );
}

