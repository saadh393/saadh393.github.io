/*  
💥 Title : fadeTransition
📃 Description : Transition
✍ Author : Saad Hasan
⌚ Date : 02/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import { Spring, Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";

const fadeTransition = ({ children, animate }) => {
  return (
    <>
      <Transition
        native
        items={animate}
        from={{ opacity: 0, marginTop: -100 }}
        enter={{ opacity: 1, marginTop: 0 }}
        leave={{ opacity: 0, marginTop: 100 }}
        delay={4000}
      >
        {(props) => <animated.div style={props}>{children}</animated.div>}
      </Transition>
    </>
  );
};

export default fadeTransition;
