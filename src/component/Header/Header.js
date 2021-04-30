/*  
💥 Title : Header
📃 Description : Header
✍ Author : Saad Hasan
⌚ Date : 22/ April/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import { Spring, Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { visibility } from "../../App";
import style from "./Header.module.css";

const Header = () => {
  const { status } = useContext(visibility);
  return (
    <>
      <header>
        <Transition
          items={status === 0}
          from={{ opacity: 0, marginBottom: -10 }}
          enter={{ opacity: 1, marginBottom: 0 }}
          leave={{ opacity: 0, marginBottom: 10 }}
          delay={4000}
        >
          {(props) => (
            <animated.div style={props}>
              <div className={style.introText}>
                <p className={style.introTopText}>Web Developer</p>
                <h1>
                  Saad Hasan <span>.</span>
                </h1>
                <p className={style.introDescription}>
                  Working with Client and community. We deliver master plans that create vibrant new Places and Spaces
                  attact people and encourage investment thought
                </p>
              </div>
            </animated.div>
          )}
        </Transition>
      </header>
    </>
  );
};

export default Header;
