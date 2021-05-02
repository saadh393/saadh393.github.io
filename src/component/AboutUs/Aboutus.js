/*  
💥 Title : Aboutus
📃 Description : This is About Us Page
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import saad from "../../image/Saad.jpg";
import { Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { visibility } from "../../App";
import "./about.css";

const Aboutus = () => {
  const { status } = useContext(visibility);
  return (
    <>
      <section className="flex alignCenter justifyCenter">
        <div className="aboutme-section">
          <div className="about-row grid grid-2-2 justifyCenter alignCenter">
            <Transition
              native
              items={status === -1}
              from={{ opacity: 0, marginBottom: -15 }}
              enter={{ opacity: 1, marginBottom: 0 }}
              leave={{ opacity: 0, marginTop: 100 }}
              delay={4000}
            >
              {(props) => (
                <animated.div style={props}>
                  <div className="about-info">
                    <h1>About Me</h1>
                    <p>
                      Hello ! My name is Saad Hasan, I am a fast learner and passionate Web Developer, experienced in
                      JavaScript, PHP, Python, Java, Kotlin Programming Languages. Also, I have a good understanding of
                      modern technologies such as React.js, Next.js, Node.js, Express.js, MongoDB as well as I have good
                      experience working as an Android Developer. I am familiar with Redux, SASS, Svelte, Electron.js,
                      and React Native.
                    </p>

                    <button>Get My Resume</button>
                  </div>
                </animated.div>
              )}
            </Transition>
            <div className="about-image">
              <Transition
                native
                items={status === -1}
                from={{ opacity: 0, marginBottom: 10 }}
                enter={{ opacity: 1, marginBottom: 0 }}
                leave={{ opacity: 0, marginTop: 100 }}
                delay={4000}
              >
                {(props) => (
                  <animated.div style={props}>
                    <img src={saad} alt="Saad Hasan" />
                    <div className="imageBorder"></div>
                  </animated.div>
                )}
              </Transition>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutus;
