import { createContext, useEffect, useState } from "react";
import Aboutus from "./component/AboutUs/Aboutus";
import Blog from "./component/Blog/Blog";
import Contact from "./component/Contact/Contact";
import Experience from "./component/Experience/Experience";
import Header from "./component/Header/Header";
import LeftOverlay from "./component/LeftOverlay/LeftOverlay";
import Preloader from "./component/Preloader/Preloader";
import Projects1 from "./component/Projects/Projects1/Projects1";
import ProjectSlider from "./component/ProjectSlider/ProjectSlider";
import "./styles/global.css";
import { loadImage, API_KEY, BASE_URL } from "./util/util";

export const visibility = createContext({});

function App() {
  const [status, setStatus] = useState(0);
  const portData = JSON.parse(localStorage.getItem("portfolio")) || [];
  const blogData = JSON.parse(localStorage.getItem("blogs")) || [];
  const [portfolio, setPortfolio] = useState(portData);
  const [blog, setBlog] = useState(blogData);
  const [isloaded, setIfLoaded] = useState(false);
  const [isTime, setTime] = useState(false);

  console.log("Portfolio", portfolio);

  useEffect(() => {
    setTimeout(() => {
      setTime(true);
    }, 1000);

    // Fetching Projects
    fetch(`${BASE_URL}Projects`, {
      headers: {
        apikey: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPortfolio(data);
        localStorage.setItem("portfolio", JSON.stringify(data));
      });

    // Fetching Blog Data
    fetch(`${BASE_URL}Blogs`, {
      headers: {
        apikey: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        localStorage.setItem("blogs", JSON.stringify(data));
      });

    Promise.all(portfolio.map((project) => loadImage(project.image)))
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    Promise.all(blog.map((project) => loadImage(project.image)))
      .then(() => {
        console.log("Image loaded");
        setIfLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIfLoaded(true);
      });
  }, []);

  window.onwheel = (e) => {
    if (!isloaded || !isTime) {
      return;
    }

    const wheel = e.wheelDeltaY;

    if (wheel > 0) {
      if (status < 0) {
        setStatus(status + 1);
      }
    } else if (status < -6) {
      console.log();
    } else {
      setStatus(status - 1);
    }

    console.log(status);
  };

  return (
    <>
      {isloaded && isTime && portfolio.length ? (
        <visibility.Provider value={{ status, blog }}>
          <LeftOverlay />

          {status === 0 && <Header />}
          {/* {status === -2 && <Education />} */}
          {status === -1 && <Aboutus />}
          {status === -2 && <Experience />}
          {status === -3 && <ProjectSlider data={portfolio} />}
          {status === -4 && <Blog />}
          {status === -5 && <Contact />}
        </visibility.Provider>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default App;
