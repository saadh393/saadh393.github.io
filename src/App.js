import { createContext, useState } from 'react';
import Aboutus from './component/AboutUs/Aboutus';
import Blog from './component/Blog/Blog';
import Contact from './component/Contact/Contact';
import Experience from './component/Experience/Experience';
import Header from './component/Header/Header';
import LeftOverlay from './component/LeftOverlay/LeftOverlay';
import Projects1 from './component/Projects/Projects1/Projects1';
import './styles/global.css';

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

    const inBetween = (max, min) => !!(min <= status && status <= max);

    return (
        <>
            <visibility.Provider value={{ status }}>
                <LeftOverlay />

                {status === 0 && <Header />}
                {status === -1 && <Experience />}
                {/* {status === -2 && <Education />} */}
                {status === -2 && <Aboutus />}
                {status === -3 && <Projects1 />}
                {status === -4 && <Projects1 isReversed />}
                {status === -5 && <Projects1 />}
                {status === -6 && <Blog />}
                {status === -7 && <Contact />}
            </visibility.Provider>
        </>
    );
}

export default App;
