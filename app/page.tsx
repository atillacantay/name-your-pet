import { LocaleSwitcher } from "@/components/locale-switcher";
import PetNameGeneratorWrapper from "@/components/pet-name-generator-wrapper";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { baseUrl } from "./constants/common";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const locale = await getLocale();

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      siteName: t("openGraph.siteName"),
      type: "website",
      locale,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("openGraph.title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/og-image.jpg"], // Same image as Open Graph
      creator: "@petnamegen", // Replace with your Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
      },
    },
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          sizes: "16x16",
          type: "image/x-icon",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    category: "technology",
    metadataBase: new URL(baseUrl),
  };
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-6">
          <LocaleSwitcher />
        </div>
        <PetNameGeneratorWrapper />
      </div>
    </div>
  );
}
