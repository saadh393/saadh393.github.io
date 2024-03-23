import React from "react";
import PopularSpace from "../Cards/PopularSpace";
import IntroCard from "../Cards/IntroCard";
import Experience from "../Cards/Experience";
import AvaterImage from "../Cards/AvaterImage";
import Link from "next/link";
import Image from "next/image";

export default function Intro() {
  return (
    <div className="lg:grid lg:grid-cols-4 gap-10 space-y-8 lg:space-y-0">
      <PopularSpace />
      <IntroCard />
      <Experience />
      <div className="bg-[#070707] p-8 my-8 slick-border rounded-lg max-w-3xl w-full">
        <p className="text-secondary text-xl">@saadh393</p>

        <ul className="flex items-center gap-8 text-primary  my-4">
          <li>570 followers</li>
          <li>434 connections</li>
          <li>50+ Posts</li>
        </ul>

        <div className="text-trinary">
          <p>Jr. Software Engineer</p>
          <p>Analyzen Innovation Lab, Bangladesh</p>
        </div>

        <Link href={"https://www.linkedin.com/in/saadh393/"} target="_blank">
          <div className="cursor-pointer bg-primary text-center px-8 py-3 text-black font-semibold hover:scale-105 transition-transform rounded-full my-8">
            Follow Me
          </div>
        </Link>

        <div>
          <Image className="mx-auto" src="/images/qr-code.png" alt="Saad Hasan" width={150} height={150} />
        </div>
      </div>
    </div>
  );
}
