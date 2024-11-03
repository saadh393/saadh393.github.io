import Image from "next/image";
import React from "react";

export default function AvaterImage() {
  return (
    <div className="slick-border h-72 md:h-72 lg:h-full relative overflow-hidden">
      <Image src="/images/saad-2.jpg" alt="Picture of the author" fill={true} objectFit="cover" />
    </div>
  );
}
