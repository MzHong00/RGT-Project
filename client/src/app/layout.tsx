import type { Metadata } from "next";

import Provider from "./provider";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "RGT 프로젝트",
  description: "Book Manage System Develop project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
