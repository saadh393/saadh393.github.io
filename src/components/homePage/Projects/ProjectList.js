import Projects from "@/data/Projects";
import React from "react";

export default function ProjectList({ setState }) {
  return (
    <div className="py-8">
      {Projects.map((item, index) => (
        <ProjectItem key={index} item={item} setState={() => setState(index)} />
      ))}
    </div>
  );
}

function ProjectItem({ item, setState }) {
  return (
    <div
      onMouseOver={setState}
      className="text-trinary flex gap-4 text-xl border-b border-trinary py-4 font-medium hover:text-white cursor-pointer transition-colors"
    >
      <div>0{item.id + 1}</div>
      <p>{item.title}</p>
    </div>
  );
}
