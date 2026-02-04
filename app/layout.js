import { Cinzel } from "next/font/google";
import "./globals.css";
import Chrome from "@/components/common/Chrome";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata = {
  title: "Property Search | Luxury Real Estate",
  description: "Find your dream luxury property.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} antialiased`}>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
