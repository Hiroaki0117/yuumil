import Header from "@/components/layout/header";
import Link from "next/link";
import React from "react";

export default function MarketingLayout({children}: {children: React.ReactNode}) {
    <>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        {/* <Footer /> */}
    </>
}