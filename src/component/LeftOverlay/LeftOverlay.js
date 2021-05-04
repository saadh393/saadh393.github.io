/*  
💥 Title : LeftOverlay
📃 Description : Here the social Icons will be shown
✍ Author : Saad Hasan
⌚ Date : 22/ April/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import style from "./LetOverlay.module.css";
import facebook from "../../image/facebook.svg";
import linkedin from "../../image/linkedin.svg";
import github from "../../image/github.svg";

const LeftOverlay = () => {
  const handleMedia = (sitename) => {
    if (sitename === "github") {
      window.open("https://github.com/saadh393", "_blank");
    }
    if (sitename === "linkedin") {
      window.open("https://www.linkedin.com/in/saadh393/", "_blank");
    }

    if (sitename === "facebook") {
      window.open("https://www.facebook.com/saadh393", "_blank");
    }
  };
  return (
    <>
      <div className={style.LeftOverlay}>
        <div className={style.line}></div>
        <div className={style.socialIcons}>
          <img src={github} className={style.github} onClick={() => handleMedia("github")} />
          <img src={linkedin} className={style.linkedin} onClick={() => handleMedia("linkedin")} />
          <img src={facebook} className={style.facebook} onClick={() => handleMedia("facebook")} />
        </div>
        <div className={style.line}></div>
      </div>
    </>
  );
};

export default LeftOverlay;
