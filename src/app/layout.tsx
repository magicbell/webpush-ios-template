import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { getUserToken } from "./auth";
import Provider from "@magicbell/react/context-provider";
import Footer from "@/components/footer";
import "./globals.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Push Next.js Template - MagicBell",
  description: "A minimal Web Push Next.js Starter Template using MagicBell",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userToken = await getUserToken();

  return (
    <Provider token={userToken}>
      <html lang="en">
        <body
          className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
        >
          <div className="font-sans flex flex-col items-center justify-center min-h-screen px-8 pb-20 gap-16">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </Provider>
  );
}
