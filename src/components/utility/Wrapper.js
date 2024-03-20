import React from "react";

export default function Wrapper({ children }) {
  return (
    <section className="slick-border min-h-[100dvh] h-full w-full rounded-lg  md:!px-10 grid place-items-center">
      {children}
    </section>
  );
}
