import React from "react";

export default function PopularSpace() {
  // Github, Linkedin, Medium, Hashnode, Figma
  return (
    <div className="slick-border h-[500px] lg:h-full">
      <div className="mb-6">
        <span className="text-[#525252] text-xs tracking-wider">QUICK LINKS</span>
        <h3 className="text-[#969696] text-[21px]  tracking-wider">Popular Space</h3>
      </div>

      <div className="space-y-4">
        <ListItems data={{ title: "Github", content: "@saadh393", svg: "", link: "" }} />
        <ListItems data={{ title: "LinkedIn", content: "@saadh393", svg: "", link: "" }} />
        <ListItems data={{ title: "Medium", content: "@saadh393", svg: "", link: "" }} />
        <ListItems data={{ title: "Hashnode", content: "@saadh393", svg: "", link: "" }} />
        <ListItems data={{ title: "Figma", content: "@saadh393", svg: "", link: "" }} />
      </div>
    </div>
  );
}

const ListItems = ({ data }) => {
  const { title, content, svg } = data;

  return (
    <div className="flex items-center gap-4">
      {/* Image */}
      <div className="border border-gray-500/30 h-12 w-12 border-2 rounded-md grid place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-primary font-medium">{title}</h3>
        <span className="text-gray-200/40">{content}</span>
      </div>
    </div>
  );
};
