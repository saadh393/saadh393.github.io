import helvaticaFont from "../fonts/helvaticaFont";
import "./globals.css";
import Script from "next/script";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import BfcacheHandler from "@/components/BfcacheHandler";

export const metadata = {
    title: "Saad Hasan - Software Engineer",
    description:
        "Portfolio and professional profile of Saad Hasan, JavaScript engineer specialized in Node.js, React, and Next.js.",
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
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://saadh393.github.io",
        siteName: "Saad Hasan - Software Engineer",
        images: [
            {
                url: "https://saadh393.github.io/images/saad-meta.png",
                width: 1200,
                height: 630,
                alt: "Saad Hasan - Software Engineer",
            },
        ],
    },
};

export default function RootLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Saad Hasan",
        alternateName: "Nasimul Hasan",
        jobTitle: "Junior Software Engineer",
        description:
            "Full Stack JavaScript Developer specialized in Node.js, React, and Next.js.",
        url: "https://saadh393.github.io",
        image: "https://raw.githubusercontent.com/saadh393/saadh393/refs/heads/main/images/banner_1.png",
        sameAs: [
            "https://github.com/saadh393",
            "https://www.linkedin.com/in/saadh393/",
            "https://medium.com/@saadh393",
            "https://saadh393.hashnode.dev/",
            "https://x.com/saadx393",
            "https://app.daily.dev/saadh393",
        ],
        knowsAbout: [
            "JavaScript",
            "Node.js",
            "React",
            "Next.js",
            "Backend Architecture",
        ],
        workLocation: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressCountry: "Bangladesh" },
        },
    };

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <meta
                    name="google-site-verification"
                    content="BMgNbZRStRHN4TUmmVil85q_zc9EwRyI_aMTamtwnHY"
                />

                <Script
                    src="https://www.googletagmanager.com/gtag/js"
                    strategy="lazyOnload"
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_MEASUREMENT_ID', {
              send_page_view: false  // Disable automatic page views
            });
            
            // Send initial page view
            gtag('event', 'page_view', {
              page_location: window.location.href,
              page_title: document.title,
              bfcache: false
            });
          `}
                </Script>
            </head>
            <body className={`${helvaticaFont.className} bg-black`}>
                <BfcacheHandler />
                {children}
                <Grain />
                <Cursor />
            </body>
        </html>
    );
}
