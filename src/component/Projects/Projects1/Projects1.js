/*  
💥 Title : Blogs
📃 Description : My Blogs will be shown here
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import style from './Projects1.module.css';
import ProjectsCard1 from './ProjectsCard1';

const Projects1 = ({ isReversed }) => (
    <>
        <section className="flex alignCenter justifyCenter gap20">
            <div className={style.Projectswrapper}>
                <div className={style.Projectstitle}>
                    <h1 className="title textCenter">Something I Build</h1>
                </div>
                <div>
                    <ProjectsCard1 isReversed={isReversed} />
                </div>
            </div>
        </section>
    </>
);

export default Projects1;
