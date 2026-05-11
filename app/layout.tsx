import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import PageTransition from "./components/PageTransition";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";
import {
    DEFAULT_OG_IMAGE,
    GOOGLE_SITE_VERIFICATION,
    SITE_DESCRIPTION,
    SITE_LOCALE,
    SITE_NAME,
    SITE_TITLE,
    SITE_URL,
} from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
        default: SITE_TITLE,
        template: "%s — Saad Hasan",
    },
    description: SITE_DESCRIPTION,
    keywords: [
        "Saad Hasan",
        "Frontend Engineer",
        "React Developer",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Bangladesh",
        "Portfolio",
        "Software Engineer",
    ],
    authors: [{ name: "Saad Hasan", url: SITE_URL }],
    creator: "Saad Hasan",
    publisher: "Saad Hasan",
    category: "technology",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    manifest: "/manifest.webmanifest",
    verification: {
        google: GOOGLE_SITE_VERIFICATION,
    },
    openGraph: {
        type: "website",
        locale: SITE_LOCALE,
        url: SITE_URL,
        siteName: SITE_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [DEFAULT_OG_IMAGE.url],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon.png", type: "image/png", sizes: "100x100" },
        ],
        shortcut: ["/favicon.ico"],
        apple: [{ url: "/favicon.png", sizes: "100x100", type: "image/png" }],
    },
};

export const viewport: Viewport = {
    themeColor: "#ffffff",
    colorScheme: "light",
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
            <body>
                <SmoothScroll />
                <PageTransition>{children}</PageTransition>
            </body>
            <GoogleAnalytics gaId="G-YYYV093E1F" />
        </html>
    );
}
