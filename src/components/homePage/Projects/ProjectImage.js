import Projects from "@/data/Projects";
import Image from "next/image";
import React from "react";

export default function ProjectImage({ state }) {
  let index = 0;
  return (
    <div className="h-[540px] w-full overflow-hidden">
      {Projects.map((item, i) => {
        return (
          <div
            key={item.id}
            className="relative w-full h-full overflow-hidden rounded-xl"
            style={{ transform: `translateY(-${540 * (state - item.id)}px)` }}
            data-state={state}
            data-index={item.id}
            data-diff={state - item.id}
          >
            <Image src={item.image} fill={true} alt="" objectFit="cover" />
          </div>
        );
      })}
    </div>
  );
}
