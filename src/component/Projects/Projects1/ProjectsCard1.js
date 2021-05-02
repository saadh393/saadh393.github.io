/*  
💥 Title : BlogCard
📃 Description : Blog Card means each blog
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import { Transition } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useContext } from 'react';
import { visibility } from '../../../App';
import blogimage from '../../../image/blog/blog1.png';
import github from '../../../image/svg/primary/github.svg';
import style from './Projects1.module.css';

const ProjectsCard1 = ({ isReversed }) => {
    const { status } = useContext(visibility);

    return (
        <>
            <div
                className={`${style.singleProjects}`}
                style={isReversed && { justifyContent: 'flex-end' }}
            >
                <Transition
                    native
                    items={status === -1}
                    from={{ opacity: 0, marginLeft: -50 }}
                    enter={{ opacity: 1, marginLeft: 0 }}
                    leave={{ opacity: 0, marginLeft: 20 }}
                    delay={2000}
                >
                    {(props) => (
                        <animated.div style={{ ...props }} className={style.Projectsthumb}>
                            <img src={blogimage} alt="" style={{ width: '100%' }} />
                        </animated.div>
                    )}
                </Transition>

                {/* <img src={blogimage} alt="" className={style.Projectsthumb} /> */}

                <div
                    className={style.Projectsinfo}
                    style={isReversed && { alignItems: 'flex-start' }}
                >
                    <h1>Projects Title</h1>
                    <div className={style.Projectsdescription}>
                        <p>
                            A nicer look at your GitHub profile and repository stats with data
                            visualizations of your top languages and stars. Sort through your top
                            repos by number of stars, forks, and size.
                        </p>
                    </div>
                    <ul className={style.Projectstechnologies}>
                        <li>Kotlin</li>
                        <li>Retrofit</li>
                        <li>Room Persistance Library</li>
                    </ul>
                    <div className={style.Projectslinks}>
                        <img src={github} alt="See in Github" />
                        <img src={github} alt="See the Projects" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectsCard1;
