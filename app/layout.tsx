import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "juicebox | Reality check",
  description:
    "Compare your thoughts on technology with current industry opinions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
