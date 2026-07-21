import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import { CartProvider } from "../context/CartContext";
import ClientShell from "../components/ClientShell";

export const metadata: Metadata = {
  title: "Prowealth Fashion House",
  description: "Premium fashion experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col pt-[70px] md:pt-[90px]">
        <CartProvider>
          <ClientShell>
            <Navigation />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </ClientShell>
        </CartProvider>
      </body>
    </html>
  );
}
