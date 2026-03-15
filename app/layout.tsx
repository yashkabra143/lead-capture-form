import type { Metadata } from "next";
import "./globals.css";
 
export const metadata: Metadata = {
  title: "Lead Capture Form",
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
