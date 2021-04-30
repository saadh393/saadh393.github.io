/*  
💥 Title : Portfolio
📃 Description : Portfolio Section
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

import PortfolioCard from "./PortfolioCard";

/*  🔥 React Dependencies 🔥 */

const Portfolio = () => {
  return (
    <>
      <section className="centerInParent">
        <div className="">
          <h1>Other Noteworthy Projects</h1>
          <div className="portfolio-wrapper">
            <PortfolioCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
