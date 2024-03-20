import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";
import Image from "next/image";
import React from "react";

export default function Introduction() {
  return (
    <Wrapper>
      <div>
        <div className="my-8">
          <Title>Hey there</Title>
          <Title>I&apos;m Saad Hasan</Title>
        </div>
        <p className="text-[#969696] text-3xl">
          I have been working as a Professional Frontend Developer for the last 1 year, Though I started my Self-Taught
          Programming Journey In 2011.
        </p>

        <div className="py-10 w-full space-y-4 my-8 lg:my-16 lg:px-72">
          <div className="flex flex-col lg:flex-row gap-4 slick-border !p-2 !py-4 lg:!py-2 !min-h-min  !rounded-xl mx-auto w-full ">
            <div className="flex items-center gap-4">
              <Image src="/images/experience/analyzen.svg" alt="Saad Hasan" width={40} height={40} />
              <span className="text-primary text-lg">Analyzen</span>
            </div>
            <div className="bg-[#171919] p-2 rounded-lg flex-1 lg:ml-4">
              <p className="text-sm text-[#969696] lg:pl-5">
                In this role as a Jr. Software Engineer, I develop and deploy front-end components for web applications
                within the company.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 slick-border !p-2 !py-4 lg:!py-2 !min-h-min  !rounded-xl mx-auto ">
            <div className="flex items-center gap-4 ">
              <Image src="/images/experience/lws.svg" alt="Saad Hasan" width={40} height={40} />
              <span className="text-primary text-lg">Learn with Sumit</span>
            </div>

            <div className="bg-[#171919] p-2 rounded-lg flex-1">
              <p className="text-sm text-[#969696] lg:pl-5">
                As a Product Manager, I oversee planning, organizing, and directing the development of products within
                this company&rsquo;s portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
