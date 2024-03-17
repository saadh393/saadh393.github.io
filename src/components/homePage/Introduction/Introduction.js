import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";
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

        <div className="py-10">
          <Title>Todo</Title>
        </div>
      </div>
    </Wrapper>
  );
}
