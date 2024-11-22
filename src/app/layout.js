import Cursor from "@/components/Cursor";
import helvaticaFont from "../fonts/helvaticaFont";
import "./globals.css";
import Grain from "@/components/Grain";
import { GoogleAnalytics } from "@/components/utility/GoogleAnalytics";

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
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={`${helvaticaFont.className} bg-black`}>
        
        {children}

        <Grain />
        
        <Cursor />
      </body>
      
    </html>
  );
}
