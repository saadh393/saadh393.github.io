import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import PageTransition from "./components/PageTransition";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const BASE_URL = "https://saadh393.github.io";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Saad Hasan — Frontend Engineer",
        template: "%s — Saad Hasan",
    },
    description:
        "Frontend engineer specializing in React and Next.js. Building production apps at scale — LMS for 10k+ students, distributed streaming, semantic search.",
    keywords: [
        "Saad Hasan",
        "Frontend Engineer",
        "React Developer",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Bangladesh",
    ],
    authors: [{ name: "Saad Hasan", url: BASE_URL }],
    creator: "Saad Hasan",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: BASE_URL,
        siteName: "Saad Hasan",
        title: "Saad Hasan — Frontend Engineer",
        description:
            "Frontend engineer specializing in React and Next.js. Building production apps at scale — LMS for 10k+ students, distributed streaming, semantic search.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Saad Hasan — Frontend Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Saad Hasan — Frontend Engineer",
        description:
            "Frontend engineer specializing in React and Next.js. Building production apps at scale.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1 },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <Head>
                <meta
                    name="google-site-verification"
                    content="BMgNbZRStRHN4TUmmVil85q_zc9EwRyI_aMTamtwnHY"
                />
            </Head>
            <body>
                <SmoothScroll />
                <PageTransition>{children}</PageTransition>
            </body>
            <GoogleAnalytics gaId="G-YYYV093E1F" />
        </html>
    );
}
