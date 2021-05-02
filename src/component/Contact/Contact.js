/*  
💥 Title : Contact
📃 Description : Get In Touch
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import { Transition } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useContext } from 'react';
import { visibility } from '../../App';
import './Contact.css';

const Contact = () => {
    const { status } = useContext(visibility);
    return (
        <>
            <section className="centerInParent">
                <div className="contact-wrapper">
                    <h1>
                        Get In Touch
                        <span role="img" aria-label="Hi">
                            👋
                        </span>
                    </h1>
                    <Transition
                        native
                        items={status === -1}
                        from={{ opacity: 0, marginTop: -10 }}
                        enter={{ opacity: 1, marginTop: 0 }}
                        leave={{ opacity: 0, marginTop: 10 }}
                        delay={2000}
                    >
                        {(props) => (
                            <animated.p style={props}>
                                I am interested in working with any company that thinks my skill
                                will be helpful for them. If you are looking for someone like me,
                                please let me know. Or you can just say hello to me
                                <span role="img" aria-label="haha">
                                    😁
                                </span>
                            </animated.p>
                        )}
                    </Transition>
                    <a href="mailto:saadh393@gmail.com">
                        <button type="button"> Say Hello </button>
                    </a>
                </div>
            </section>
        </>
    );
};

export default Contact;
