"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../../context/AuthContext";
import ToasterContext from "../../context/ToastContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
        >
            <AuthProvider>
                <Lines />
                <Header />
                <ToasterContext />
                {children}
                <Footer />
                <ScrollToTop />
            </AuthProvider>
        </ThemeProvider>
    );
}
