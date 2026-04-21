import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  title: "Boardwalk Technologies",
  description:
    "A comprehensive platform for managing business operations, client relations, and project workflows",
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/favicon.png",
  },
  openGraph: {
    title: "Boardwalk Technologies",
    description:
      "A comprehensive platform for managing business operations, client relations, and project workflows",
    url: "https://boardwalktech.com",
    siteName: "Boardwalk Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boardwalk Technologies",
    description:
      "A comprehensive platform for managing business operations, client relations, and project workflows",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white text-gray-900">{children}</body>
    </html>
  );
}
