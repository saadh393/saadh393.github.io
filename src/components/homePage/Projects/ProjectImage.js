import Projects from "@/data/Projects";
import Image from "next/image";
import React from "react";

export default function ProjectImage({ state }) {
  return (
    <div className="h-[540px] w-full overflow-hidden rounded-xl ">
      {Projects.map((item, i) => {
        const y = 540 * state;
        return (
          <div
            key={item.image}
            className="relative w-full h-full overflow-hidden transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${y}px)` }}
            data-calculations={y}
          >
            <Image src={item.image} fill={true} alt="" objectFit="cover" />
          </div>
        );
      })}
    </div>
  );
}
