import Image from "next/image";
import React from "react";

export default function AvaterImage() {
  return (
    <div className="slick-border h-full md:h-full relative overflow-hidden">
      <Image src="/images/saad-2.jpg" alt="Picture of the author" fill={true} objectFit="cover" />
    </div>
  );
}
