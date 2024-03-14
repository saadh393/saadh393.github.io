import HeroSection from "@/components/homePage/Hero/HeroSection";
import Intro from "@/components/homePage/Intro/Intro";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="slick-border h-full w-full">
        <HeroSection />
        <Intro />
      </div>
    </main>
  );
}
