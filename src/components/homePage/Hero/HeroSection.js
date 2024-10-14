import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="w-full slick-border h-full  hidden lg:grid place-items-center">
      <Link
        target="_blank"
        title="Saad Hasan"
        href={"https://www.google.com/search?q=%40saadh393&oq=%40saadh393"}
        style={{ lineBreak: "anywhere" }}
        className="md:text-3xl lg:text-6xl font-semibold text-center text-[#9eb2b2] cursor-pointer breack"
      >
        <span className="text-primary">@</span>
        saadh393
      </Link>
    </div>
  );
}
