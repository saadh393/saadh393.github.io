/*  
💥 Title : Experience
📃 Description : Experience List
✍ Author : Saad Hasan
⌚ Date : 22/ April/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import { Spring, Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { visibility } from "../../App";
import "./Experience.css";
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
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
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
              from={{ opacity: 0, marginTop: -100 }}
              enter={{ opacity: 1, marginTop: 0 }}
              leave={{ opacity: 0, marginTop: 100 }}
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
