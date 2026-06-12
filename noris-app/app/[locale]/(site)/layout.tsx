import { Inter } from "next/font/google";
import "../../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Proivder from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noris | Next.js Template for Startup and SaaS",
  description: "Built with Next.js and TypeScript",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <NextIntlClientProvider>
          <Proivder>{children}</Proivder>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
