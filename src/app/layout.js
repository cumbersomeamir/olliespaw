import { Playfair_Display, Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import CartSidebar from "@/components/CartSidebar";

const playfair = Playfair_Display({
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata = {
  title: "Ollie’s Paw — Every Paw Matters",
  description:
    "Ollie’s Paw creates premium, wellness-focused pet products made with love and backed by science. Health, nutrition & care for every paw.",
  keywords: [
    "pet care India",
    "dog nutrition India",
    "cat grooming",
    "natural pet food",
    "pet supplements India",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
