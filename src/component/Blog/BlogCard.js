/*  
💥 Title : PortfolioCard
📃 Description : Card of Portfolio
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import image from "../../image/portfolio/moviewall.png";
import github from "../../image/svg/primary/github.svg";
import playstore from "../../image/svg/primary/playstore.svg";

const BlogCard = ({ data }) => {
  return (
    <>
      <div className="Blog-card">
        <img src={data.image} />
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
