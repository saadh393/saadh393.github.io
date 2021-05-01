import "./styles/global.css";
import Header from "./component/Header/Header";
import LeftOverlay from "./component/LeftOverlay/LeftOverlay";
import Experience from "./component/Experience/Experience";
import { createContext, useContext, useEffect, useState } from "react";
import { config, Transition, useTransition } from "@react-spring/core";
import Education from "./component/Education/Education";
import Aboutus from "./component/AboutUs/Aboutus";
import Blog from "./component/Blog/Blog";
import Contact from "./component/Contact/Contact";
import Projects from "./component/Projects/Projects";

export const visibility = createContext(0);

function App() {
  const [status, setStatus] = useState(0);

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

  const inBetween = (max, min) => {
    return min <= status && status <= max ? true : false;
  };

  return (
    <>
      <visibility.Provider value={{ status }}>
        <LeftOverlay />

        {status === 0 && <Header />}
        {status === -1 && <Experience />}
        {/* {status === -2 && <Education />} */}
        {status === -2 && <Aboutus />}
        {status === -3 && <Projects />}
        {status === -4 && <Blog />}
        {status === -5 && <Contact />}
      </visibility.Provider>
    </>
  );
}

export default App;
