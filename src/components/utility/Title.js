"use client";
import React from "react";

export default function Title({ children }) {
  return (
    <div>
      <h1 className="font-semibold text-5xl text-[#9eb2b2]">{children}</h1>
    </div>
  );
}
