import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider } from "@mantine/core";
import { ToastContainer } from 'react-toastify';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QueryProvider from "./providers/QueryProvider";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MekaCash",
  description: "MekaCash - Empowering Your Financial Journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        <MantineProvider
          theme={{
            breakpoints: {
              xs: "36em",
              sm: "48em",
              md: "62em",
              lg: "75em",
              xl: "88em",
              "2xl": "96em",
              "3xl": "108em",
              "4xl": "120em",
              "5xl": "137.5em",
            },
          }}
          defaultColorScheme="light"
        >
          <QueryProvider>
            <AuthProvider>
              <Navbar />
              <div className="mt-40">{children}</div>

              <Footer />
            </AuthProvider>
          </QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
