import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const IaWriterFont = localFont({
  src: [
    {
      path: "./iAWriterQuattroV.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./iAWriterQuattroV-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
});

export default IaWriterFont;
