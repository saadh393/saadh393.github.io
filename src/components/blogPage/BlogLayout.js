import Link from "next/link";
import React from "react";

export default function BlogLayout({ children }) {
  return (
    <>
      <nav>
        <div className="max-w-[815px] mx-auto flex justify-between py-6 px-12">
          <div className="flex gap-4">
            <p className="text-secondary">Sat, 23 March 2024</p>
            <Link className="cursor-pointer" href={"/blogs"}>
              Blogs
            </Link>
          </div>

          <Link
            title="Saad Hasan"
            href={"/"}
            className="text-base font-semibold text-center text-[#9eb2b2] cursor-pointer"
          >
            <span className="text-primary">@</span>saadh393
          </Link>
        </div>
      </nav>

      <main className="mt-4">
        <div className="max-w-[815px] mx-auto py-6 px-4 prose lg:prose-xl dark:prose-invert">{children}</div>
      </main>
    </>
  );
}
