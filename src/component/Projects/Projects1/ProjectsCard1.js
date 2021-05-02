/*  
💥 Title : BlogCard
📃 Description : Blog Card means each blog
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import { Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { visibility } from "../../../App";
import github from "../../../image/svg/primary/github.svg";
import web from "../../../image/svg/primary/web.svg";
import playstore from "../../../image/svg/primary/playstore.svg";
import style from "./Projects1.module.css";

const ProjectsCard1 = ({ isReversed, data }) => {
  const { status } = useContext(visibility);
  const { title, description, image, links, technologies } = data;
  return (
    <>
      <div className={`${style.singleProjects}`} style={isReversed && { justifyContent: "flex-end" }}>
        <Transition
          native
          items={status === -1}
          from={{ opacity: 0, marginLeft: -50 }}
          enter={{ opacity: 1, marginLeft: 0 }}
          leave={{ opacity: 0, marginLeft: 20 }}
          delay={2000}
        >
          {(props) => (
            <animated.div style={{ ...props }} className={style.Projectsthumb}>
              <img src={image} loading="lazy" alt="" className={style.portfolioImage} />
            </animated.div>
          )}
        </Transition>

        {/* <img src={blogimage} alt="" className={style.Projectsthumb} /> */}

        <div className={style.Projectsinfo} style={isReversed && { alignItems: "flex-start" }}>
          <h1>{title}</h1>
          <div className={style.Projectsdescription}>
            <p>{description}</p>
          </div>
          <ul className={style.Projectstechnologies}>
            {technologies.map((tech) => (
              <li>{tech}</li>
            ))}
          </ul>
          <div className={style.Projectslinks}>
            {links.map((link) => {
              link = JSON.parse(link);
              const icon = link.domain === "github" ? github : link.domain === "playstore" ? playstore : web;
              return (
                <>
                  <a href={link.url}>
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
