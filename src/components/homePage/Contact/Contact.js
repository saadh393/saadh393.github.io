import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <div className="h-[80vh] grid place-items-center">
      <div>
        <Title>Follow Me</Title>
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
            <Image className="mx-auto" src="https://saadh393.github.io/images/qr-code.png" alt="Saad Hasan" width={150} height={150} />
          </div>
        </div>
      </div>
    </div>
  );
}
