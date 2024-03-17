import HeroSection from "@/components/homePage/Hero/HeroSection";
import Intro from "@/components/homePage/Intro/Intro";
import Introduction from "@/components/homePage/Introduction/Introduction";
import Projects from "@/components/homePage/Projects/Projects";
import Wrapper from "@/components/utility/Wrapper";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 space-y-10">
      <Wrapper>
        <HeroSection />
        <Intro />
      </Wrapper>

      <Introduction />
      <Projects />
    </main>
  );
}
