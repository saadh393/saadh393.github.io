/*  
💥 Title : ProjectSlider
📃 Description : Project Slider , This will contain all the sliders
✍ Author : Saad Hasan
⌚ Date : 12/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import "./ProjectSlider.css";
import style from "../Projects/Projects1/Projects1.module.css";
import ProjectsCard1 from "../Projects/Projects1/ProjectsCard1";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

const ProjectSlider = ({ data }) => {
  console.log("Data From Project Slider", data);

  return (
    <>
      <section className="flex alignCenter justifyCenter gap20 flexColumn">
        <div className={style.Projectstitle}>
          <h1 className="title textCenter">Something I Build</h1>
          {/* <a href="#">View Archieve</a> */}
        </div>

        <Swiper navigation={true} className="mySwiper" lazy={true}>
          {data.map((project, index) => {
            return (
              <SwiperSlide>
                <ProjectsCard1 isReversed data={project} index={index} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
};

export default ProjectSlider;
