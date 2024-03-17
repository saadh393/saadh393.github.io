import Image from "next/image";
import React from "react";

export default function ProjectImage() {
  let index = 1;
  return (
    <div className="h-[540px] w-full overflow-hidden">
      <div
        className="relative w-full h-full overflow-hidden rounded-xl"
        style={{ transform: `translateY(${index * 540}px)` }}
      >
        <Image src="/images/projects/1.webp" fill={true} alt="" objectFit="cover" />
      </div>

      <div
        className="relative w-full h-full overflow-hidden rounded-xl"
        style={{ transform: `translateY(${index * 540}px)` }}
      >
        <Image src="/images/projects/2.webp" fill={true} alt="" objectFit="cover" />
      </div>

      <div
        className="relative w-full h-full overflow-hidden rounded-xl"
        style={{ transform: `translateY(${index * 540}px)` }}
      >
        <Image src="/images/projects/1.webp" fill={true} alt="" objectFit="cover" />
      </div>

      <div
        className="relative w-full h-full overflow-hidden rounded-xl"
        style={{ transform: `translateY(${index * 540}px)` }}
      >
        <Image src="/images/projects/2.webp" fill={true} alt="" objectFit="cover" />
      </div>
    </div>
  );
}
