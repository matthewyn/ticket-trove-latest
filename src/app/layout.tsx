import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticket Trove",
  description:
    "Discover seamless movie ticket booking with our cutting-edge cinema booking application. Streamline your movie experience with easy booking, real-time seat selection, and secure payments. Explore the latest releases, reserve your seats, and enjoy hassle-free cinema outings with our intuitive platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Toaster position="top-center" gutter={12} containerStyle={{ margin: "8px" }} toastOptions={{ duration: 5000, style: { background: "#363636", color: "#fff", padding: "16px 24px" } }} />
      </body>
    </html>
  );
}
