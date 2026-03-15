import type { Metadata } from "next";
import "./globals.css";
 
export const metadata: Metadata = {
  title: "Lead capture to Indori Life Style",
  description: "Capture leads - Name, Phone, and Category",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
