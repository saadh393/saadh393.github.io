import React from "react";

export default function Experience() {
  return (
    <div className="slick-border h-full flex flex-col justify-between">
      <div className="text-left block mr-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-secondary"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
        </svg>
      </div>

      <div className="">
        <h2 className="font-bold text-4xl text-secondary">10+ years</h2>
        <p className="text-primary  text-sm">of experience, working on different technologies</p>
      </div>

      <div>
        <p className="text-sm text-trinary">
          Started learning programming back in 2011. Worked on Java, JavaScript, Python, PHP, Kotlin and so many
          languages
        </p>
      </div>
    </div>
  );
}
