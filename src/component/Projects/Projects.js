/*  
💥 Title : Blogs
📃 Description : My Blogs will be shown here
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import ProjectsCard from "./ProjectsCard";
import "./Projects.css";

const Projects = () => {
  return (
    <>
      <section className="flex alignCenter gap20">
        <div className="Projects-wrapper">
          <div className="Projects-title">
            <h1 className="title textCenter">Something I Build</h1>
          </div>
          <div className="Projects">
            <ProjectsCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
