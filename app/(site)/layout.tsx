import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
// Everything under app/(site)/ shares this shell. The announcement bar,
// navbar, and footer render once here and never re-mount when the route
// changes — only {children} (the page's own content) swaps out.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <WhatsAppFloat />
      <Footer />
    </>
  );
}