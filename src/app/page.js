import Blogs from "@/components/homePage/Blogs/Blogs";
import AvaterImage from "@/components/homePage/Cards/AvaterImage";
import Contact from "@/components/homePage/Contact/Contact";
import HeroSection from "@/components/homePage/Hero/HeroSection";
import Intro from "@/components/homePage/Intro/Intro";
import Introduction from "@/components/homePage/Introduction/Introduction";
import Projects from "@/components/homePage/Projects/Projects";
import Wrapper from "@/components/utility/Wrapper";
import Image from "next/image";

export default function Home() {
  // Todo : Blog NewsLetter Email
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 lg:p-10 space-y-10 max-w-[1919px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 grid-rows-1 lg:grid-rows-2 w-full gap-8">
        <div className="lg:col-span-4 lg:space-y-8 ">
          <HeroSection />
          <AvaterImage />
        </div>
        <div className="lg:col-span-8 row-span-5 lg:row-span-2">
          <Introduction />
        </div>
      </div>
      <Intro />

      <Projects />
      <Blogs />
      <Contact />
    </main>
  );
}
