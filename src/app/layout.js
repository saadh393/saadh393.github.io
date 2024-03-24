import Cursor from "@/components/Cursor";
import helvaticaFont from "../fonts/helvaticaFont";
import "./globals.css";
import Grain from "@/components/Grain";

export const metadata = {
  title: "Saad Hasan - Software Engineer",
  description: "Welcome to the Portfolio of Saad Hasan aka Nasimul Hasan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${helvaticaFont.className} bg-black`}>
        {children}
        <Grain />

        <Cursor />
      </body>
    </html>
  );
}
