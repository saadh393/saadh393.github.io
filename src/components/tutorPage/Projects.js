import Title from "@/components/utility/Title";
import Wrapper from "@/components/utility/Wrapper";

const projects = [
  {
    title: "Task Tracker",
    description: "Build a task management app while learning React fundamentals, state management, and component lifecycle.",
    skills: ["React Hooks", "State Management", "CRUD Operations"]
  },
  {
    title: "Weather Dashboard",
    description: "Create a weather app that fetches and displays real-time data, teaching API integration and async operations.",
    skills: ["API Integration", "Async/Await", "Data Fetching"]
  },
  {
    title: "Portfolio Site",
    description: "Develop a personal portfolio using Next.js, learning routing, SSG, and deployment strategies.",
    skills: ["Next.js", "SSG", "Responsive Design"]
  },
  {
    title: "Quiz Platform",
    description: "Build an interactive quiz application focusing on state management and user interactions.",
    skills: ["React Context", "Custom Hooks", "User Interface"]
  }
];

export default function Projects() {
  return (
    <Wrapper>
      <div className="py-16">
        <Title>Projects You'll Build</Title>
        <p className="text-trinary text-xl mt-4 mb-12 text-center">
          Learn by building real-world applications
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="slick-border p-6 hover:border-primary transition-all">
              <h3 className="text-secondary text-xl font-medium mb-2">
                {project.title}
              </h3>
              <p className="text-trinary mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="bg-[#171919] text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}