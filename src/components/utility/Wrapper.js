import React from "react";

export default function Wrapper({ children }) {
  return <section className="slick-border  w-full rounded-lg  md:!px-10 grid place-items-center">{children}</section>;
}
