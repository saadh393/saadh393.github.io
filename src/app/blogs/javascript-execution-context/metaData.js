
const metaData = {
  metadataBase: new URL("https://saadh393.github.io"),
  title: {
    default: "Saad Hasan - Software Engineer",
    template: "%s | Saad Hasan - Software Engineer", // Used for dynamic pages
  },
  description: "Over a decade of experience in software development, specializing in JavaScript and frontend technologies. Currently serving as a Junior Software Engineer, adept at frontend development, backend deployment. ",
  keywords: ["software development", "Software Engineer", "JavaScript", "frontend developer", "backend developer"],
  authors: [{ name: "Saad Hasan" }],
  creator: "Saad Hasan",
  publisher: "Saad Hasan",
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
    title: "Understanding JavaScript's Execution Context",
    description: "Exploring the Foundation of JavaScript Code Execution",
    siteName: "Saad Hasan - Software Engineer",
    images: [
      {
        url: "https://saadh393.github.io/images/js-execution-context.png",
        width: 1200,
        height: 630,
        alt: "Understanding JavaScript's Execution Context",
      },
    ],
  },
  verification: {
    google: "your-google-verification-code",
  },
  // Other optional metadata
  category: "Portfolio",
  
};


export default metaData