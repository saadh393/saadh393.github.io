import { createContext, useEffect, useState } from "react";
import Aboutus from "./component/AboutUs/Aboutus";
import Blog from "./component/Blog/Blog";
import Contact from "./component/Contact/Contact";
import Experience from "./component/Experience/Experience";
import Header from "./component/Header/Header";
import LeftOverlay from "./component/LeftOverlay/LeftOverlay";
import Projects1 from "./component/Projects/Projects1/Projects1";
import "./styles/global.css";

export const visibility = createContext({});

function App() {
  const [status, setStatus] = useState(0);
  const portData = JSON.parse(localStorage.getItem("portfolio")) || [];
  const blogData = JSON.parse(localStorage.getItem("blogs")) || [];
  const [portfolio, setPortfolio] = useState(portData);
  const [blog, setBlog] = useState(blogData);

  const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxOTg5NTgwMSwiZXhwIjoxOTM1NDcxODAxfQ.cWy3o6eoT-s_xHeQsb-TEKuQFWm27l-hyEs0FzGKtyE";

  const BASE_URL = "https://yymklxbmdokoeuqykqtv.supabase.co/rest/v1/";

  useEffect(() => {
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
  }, []);

  window.onwheel = (e) => {
    const wheel = e.wheelDeltaY;

    if (wheel > 0) {
      if (status < 0) {
        setStatus(status + 1);
      }
    } else {
      setStatus(status - 1);
    }

    console.log(status);
  };

  const inBetween = (max, min) => !!(min <= status && status <= max);

  return (
    <>
      <visibility.Provider value={{ status, blog }}>
        <LeftOverlay />

        {status === 0 && <Header />}
        {/* {status === -2 && <Education />} */}
        {status === -1 && <Aboutus />}
        {status === -2 && <Experience />}
        {status === -3 && <Projects1 data={portfolio[0]} />}
        {status === -4 && <Projects1 isReversed data={portfolio[1]} />}
        {status === -5 && <Projects1 data={portfolio[2]} />}
        {status === -6 && <Blog />}
        {status === -7 && <Contact />}
      </visibility.Provider>
    </>
  );
}

export default App;
