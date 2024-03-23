import IaWriterFont from "@/fonts/iAWriterFont";
import React from "react";

export default function layout({ children }) {
  return <div className={IaWriterFont.className}>{children}</div>;
}
