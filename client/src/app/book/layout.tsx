import type { Metadata } from 'next'

import { Header } from "@/components/layout/header/header";
 
export const metadata: Metadata = {
  title: "책 목록",
}

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>{children}</main>
    </>
  );
}
