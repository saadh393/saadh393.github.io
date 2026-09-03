import type { Metadata } from "next";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Writing from "./components/Writing";
import Contact from "./components/Contact";
import {
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_TITLE,
    SITE_URL,
    absoluteUrl,
} from "@/lib/site";

export const metadata: Metadata = {
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: SITE_NAME,
        alternateName: "Saad Hasan",
        url: SITE_URL,
        jobTitle: "Jr. Software Engineer",
        description: SITE_DESCRIPTION,
        image: absoluteUrl("/nasimul-hasan-1.png"),
      },
      {
        "@type": "WebSite",
        name: SITE_TITLE,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Writing />
      <Contact />
    </main>
  );
}
