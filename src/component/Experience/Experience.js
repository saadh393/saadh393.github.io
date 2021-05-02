/* eslint-disable react/jsx-no-duplicate-props */
/*  
💥 Title : Experience
📃 Description : Experience List
✍ Author : Saad Hasan
⌚ Date : 22/ April/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import "./Experience.css";
import { Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { visibility } from "../../App";
import GreatExperience from "./GreatExperience";
import YearsExperience from "./YearsExperience";

const Experience = () => {
  const { status } = useContext(visibility);
  return (
    <>
      <section>
        <div className="grid grid-2-2" className="experience-root">
          <div className="col experience-card">
            <Transition
              native
              items={status === -1}
              from={{ opacity: 0, marginBottom: -50 }}
              enter={{ opacity: 1, marginBottom: 0 }}
              leave={{ opacity: 0, marginTop: 100 }}
              delay={4000}
            >
              {(props) => (
                <animated.div style={props}>
                  <YearsExperience />
                </animated.div>
              )}
            </Transition>
          </div>
          <div className="col">
            <Transition
              native
              items={status === -1}
              from={{ opacity: 0, marginTop: -50 }}
              enter={{ opacity: 1, marginTop: 0 }}
              leave={{ opacity: 0, marginTop: 50 }}
              delay={4000}
            >
              {(props) => (
                <animated.div style={props}>
                  <GreatExperience />
                </animated.div>
              )}
            </Transition>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
