/*  
💥 Title : BlogCard
📃 Description : Blog Card means each blog
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import { Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useContext, useState } from "react";
import { visibility } from "../../../App";
import github from "../../../image/svg/primary/github.svg";
import web from "../../../image/svg/primary/web.svg";
import playstore from "../../../image/svg/primary/playstore.svg";
import style from "./Projects1.module.css";
import Loader from "../../loaders/Loader";

const ProjectsCard1 = ({ isReversed, data, index }) => {
  const { status } = useContext(visibility);
  const { title, description, image, links, technologies } = data;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className={`${style.singleProjects}`} style={{ justifyContent: isReversed ? "flex-end" : null }}>
        {isLoading && <Loader />}
        <Transition
          native
          items={index}
          from={{ opacity: 0, marginLeft: -50 }}
          enter={{ opacity: 1, marginLeft: 0 }}
          leave={{ opacity: 0, marginLeft: 20 }}
          delay={2000}
        >
          {(props) => (
            <animated.div style={{ ...props }} className={style.Projectsthumb}>
              <img src={image} alt="" className={style.portfolioImage} onLoad={() => setIsLoading(false)} />
            </animated.div>
          )}
        </Transition>

        <div className={style.Projectsinfo} style={{ alignItems: isReversed && "flex-start" }}>
          <h1>{title}</h1>
          <div className={style.Projectsdescription}>
            <p>{description}</p>
          </div>

          <ul className={style.Projectstechnologies}>
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>

          <div className={style.Projectslinks}>
            {links.map((link, index) => {
              link = JSON.parse(link);
              const icon = link.domain === "github" ? github : link.domain === "playstore" ? playstore : web;
              return (
                <>
                  <a href={link.url} target="_blank" key={index}>
                    <img src={icon} alt="See the Projects" />
                  </a>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsCard1;
