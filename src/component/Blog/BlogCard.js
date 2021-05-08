/*  
💥 Title : PortfolioCard
📃 Description : Card of Portfolio
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

import { useState } from "react";
import BlogLoader from "../loaders/BlogLoader";

/*  🔥 React Dependencies 🔥 */

const BlogCard = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <div className="Blog-card">
        {isLoading && <BlogLoader />}
        <img src={data.image} onLoad={() => setIsLoading(false)} />
        <div className="Blog-content">
          <h3>{data.title}</h3>
          <p>{data.description.slice(0, 300) + "..."}</p>

          <ul className="Blog-technologies">
            {/* {data.topic.map((top) => (
              <li>{top}</li>
            ))} */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
