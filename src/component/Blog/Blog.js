/*  
💥 Title : Portfolio
📃 Description : Portfolio Section
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import "./Blog.css";
import BlogCard from "./BlogCard";

const Blog = () => {
  return (
    <>
      <section className="centerInParent">
        <div className="Blog-wrapper">
          <h1 className="title textCenter">Blogs I've Written</h1>
          <div className="row">
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
