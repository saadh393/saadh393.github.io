/*  
💥 Title : Education
📃 Description  : Education Component
✍ Author : Saad Hasan
⌚ Date : 28/ April/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import { Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { visibility } from "../../App";

const Education = () => {
  const { status } = useContext(visibility);
  return (
    <>
      <section className="flex alignCenter justifyCenter">
        <Transition
          items={status === -2}
          from={{ opacity: 0, marginBottom: -10 }}
          enter={{ opacity: 1, marginBottom: 0 }}
          leave={{ opacity: 0, marginBottom: 10 }}
          delay={4000}
        >
          {(props) => (
            <animated.div style={props}>
              <div>
                <h1>Education Section</h1>
              </div>
            </animated.div>
          )}
        </Transition>
      </section>
    </>
  );
};

export default Education;
