import React from "react";
import PopularSpace from "../Cards/PopularSpace";
import IntroCard from "../Cards/IntroCard";
import Experience from "../Cards/Experience";
import AvaterImage from "../Cards/AvaterImage";

export default function Intro() {
  return (
    <div className="lg:grid lg:grid-cols-4 gap-10">
      <PopularSpace />
      <IntroCard />
      <Experience />
      <AvaterImage />
    </div>
  );
}
