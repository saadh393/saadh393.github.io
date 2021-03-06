/*  
💥 Title : GreatExperience
📃 Description : Great Experience
✍ Author : Saad Hasan
⌚ Date : 27/ April/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import ExProgress from "./ExProgress";

const GreatExperience = () => {
  return (
    <>
      <div className="great-experience-wrapper">
        <h1 className="title" style={{ marginBottom: "0px" }}>
          My Stack
        </h1>
        <small>
          I'm on this since 2013, I've tested many technologies. Though I'm not so good at all. But now I've imporved my
          skills in Web Development.
        </small>
        <ExProgress title="Javascript" progress="80" />
        <ExProgress title="Node.js" progress="50" />
        <ExProgress title="React,js" progress="60" />
        <ExProgress title="Python" progress="40" />
      </div>
    </>
  );
};

export default GreatExperience;
