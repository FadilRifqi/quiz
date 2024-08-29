// app/layout.tsx
import { Roboto_Mono } from "next/font/google";
import { Metadata } from "next";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Quiz Web App by Fadil",
  icons: {
    icon: "/favicon.ico", // Add your favicon path here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-light-base dark:bg-dark-base text-light-textPrimary dark:text-dark-textPrimary`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
