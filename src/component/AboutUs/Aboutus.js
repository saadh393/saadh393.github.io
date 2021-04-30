/*  
💥 Title : Aboutus
📃 Description : This is About Us Page
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import saad from "../../image/Saad.jpg";
import "./about.css";

const Aboutus = () => {
  return (
    <>
      <section className="flex alignCenter justifyCenter">
        <div className="aboutme-section">
          <div className="about-row grid grid-2-2 justifyCenter alignCenter">
            <div className="about-info">
              <h1>About Me</h1>
              <p>
                Hello ! My name is Saad Hasan, I am a fast learner and passionate Web Developer, experienced in
                JavaScript, PHP, Python, Java, Kotlin Programming Languages. Also, I have a good understanding of modern
                technologies such as React.js, Next.js, Node.js, Express.js, MongoDB as well as I have good experience
                working as an Android Developer. I am familiar with Redux, SASS, Svelte, Electron.js, and React Native.
              </p>

              <button>Get My Resume</button>
            </div>
            <div className="about-image">
              <img src={saad} />
              <div className="imageBorder"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutus;
