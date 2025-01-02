import helvaticaFont from "../fonts/helvaticaFont";
import "./globals.css";
import Script from "next/script";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import BfcacheHandler from "@/components/BfcacheHandler";

export const metadata = {
  title: "Saad Hasan - Software Engineer",
  description: "Welcome to the Portfolio of Saad Hasan aka Nasimul Hasan",
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
  return (
    <html lang="en">
      <head>
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
