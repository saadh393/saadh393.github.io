import Image from "next/image";
import React from "react";

export default function AvaterImage() {
  return (
    <div className="slick-border h-72 md:h-72 lg:h-full relative">
      <Image
        src="/images/saad-2.jpg"
        alt="Picture of the author"
        width={500}
        height={500}
        priority={true}
        loading="eager"
        quality={75}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
