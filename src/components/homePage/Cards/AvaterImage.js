import Image from "next/image";
import React from "react";

export default function AvaterImage() {
  return (
    <div className="slick-border h-[500px] md:h-full relative overflow-hidden">
      <Image src="/images/kalypso_optimised.webp" alt="Picture of the author" fill={true} objectFit="cover" />
    </div>
  );
}
