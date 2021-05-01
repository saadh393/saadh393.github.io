/*  
💥 Title : BlogCard
📃 Description : Blog Card means each blog
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import blogimage from "../../image/blog/blog1.png";
import github from "../../image/svg/primary/github.svg";

const ProjectsCard = () => {
  return (
    <>
      <div className="singleProjects grid grid-2-2">
        <img src={blogimage} alt="" className="Projects-thumb" />
        <div className="Projects-info">
          <h1>Projects Title</h1>
          <div className="Projects-description">
            <p>
              A nicer look at your GitHub profile and repository stats with data visualizations of your top languages
              and stars. Sort through your top repos by number of stars, forks, and size.
            </p>
          </div>
          <ul className="Projects-technologies">
            <li>Kotlin</li>
            <li>Retrofit</li>
            <li>Room Persistance Library</li>
          </ul>
          <div className="Projects-links">
            <img src={github} alt="See in Github" />
            <img src={github} alt="See the Projects" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsCard;
