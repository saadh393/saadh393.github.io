/*  
💥 Title : GreatExperience
📃 Description : Great Experience
✍ Author : Saad Hasan
⌚ Date : 27/ April/ 2021 
*/

import ExProgress from "./ExProgress";

/*  🔥 React Dependencies 🔥 */

const GreatExperience = () => {
  return (
    <>
      <div className="great-experience-wrapper">
        <h1>My Stack</h1>
        <small>
          I'm on this since 2013, I've tested many technologies. Though I'm not so good at all. But now I've imporved my
          skills in Web Development.
        </small>
        <ExProgress title="Java" progress="40" />
        <ExProgress title="Javascript" progress="80" />
        <ExProgress title="Node.js" progress="50" />
        <ExProgress title="React" progress="60" />
      </div>
    </>
  );
};

export default GreatExperience;
