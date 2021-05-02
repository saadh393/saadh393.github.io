/*  
💥 Title : Portfolio
📃 Description : Portfolio Section
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import { Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { visibility } from "../../App";
import "./Blog.css";
import BlogCard from "./BlogCard";

const Blog = () => {
  const { status, blog } = useContext(visibility);

  return (
    <>
      <section className="centerInParent">
        <div className="Blog-wrapper">
          <h1 className="title textCenter">Blogs I have Written</h1>
          <Transition
            native
            items={status === -1}
            from={{ opacity: 0, marginTop: -10 }}
            enter={{ opacity: 1, marginTop: 0 }}
            leave={{ opacity: 0, marginTop: 10 }}
            delay={2000}
          >
            {(props) => (
              <animated.div style={{ ...props }} className="row">
                <BlogCard data={blog[0]} />
                <BlogCard data={blog[1]} />
                <BlogCard data={blog[2]} />
              </animated.div>
            )}
          </Transition>
        </div>
      </section>
    </>
  );
};

export default Blog;
