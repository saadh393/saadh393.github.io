import React from "react";
import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";

const projects = [
  {
    id: 1,
    title: "Simple Task Tracker",
    description: "Start with a beginner-friendly Task Tracker app to learn React basics like components, state, and props. You'll build features to add, edit, and delete tasks, giving you a solid understanding of state management and event handling.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Weather App with API Integration",
    description: "Learn how to fetch data from APIs by creating a Weather App. Using an open API like OpenWeatherMap, you'll display weather data for different cities. This project will help you master handling asynchronous requests and integrating third-party services.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 16.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" /><path d="M16 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8" /><path d="M4 12h.01" /><path d="M20 12h.01" /><path d="M12 20h.01" /><path d="M12 4h.01" /><path d="m17 20-5-5" /><path d="m7 4 5 5" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Build a personal portfolio website using Next.js. Create static sections like 'About Me,' 'Projects,' and 'Contact.' You'll explore static site generation (SSG) and learn how to style and deploy your site.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Quiz App",
    description: "Develop a dynamic Quiz App to practice React hooks. You'll implement features like multiple-choice questions and scoring, gaining experience with state updates and conditional rendering.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    id: 5,
    title: "E-commerce Product Display",
    description: "Dive into server-side rendering (SSR) with Next.js by building an E-commerce Product Display. Fetch product data from a mock API, display product details, and understand SSR, dynamic routing, and API integration.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    )
  }
];

export default function PracticeProjects() {
  return (
    <Wrapper>
      <div className="py-16 w-full">
        <div className="text-center mb-16">
          <Title>Real-World Practice Projects</Title>
          <p className="text-trinary text-xl mt-4">
            Build these projects to master React & Next.js
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="slick-border !p-6 rounded-xl transition-all hover:border-primary group"
            >
              <div className="flex items-start gap-4">
                <div className="text-primary p-3 bg-[#171919] rounded-lg group-hover:bg-primary/10">
                  {project.icon}
                </div>
                <div>
                  <h3 className="text-secondary text-xl font-medium mb-2 group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="text-trinary text-base">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-primary text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
            Join Now to Start Building!
          </button>
        </div>
      </div>
    </Wrapper>
  );
}