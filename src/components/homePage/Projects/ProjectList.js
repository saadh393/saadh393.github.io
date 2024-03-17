import React from "react";

export default function ProjectList() {
  return (
    <div className="py-8">
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
    </div>
  );
}

function ProjectItem({ item }) {
  return (
    <div className="text-trinary flex gap-4 text-xl border-b border-trinary py-4 font-medium hover:text-white cursor-pointer transition-colors">
      <div>01</div>
      <p>Tesla Time Watch App</p>
    </div>
  );
}
