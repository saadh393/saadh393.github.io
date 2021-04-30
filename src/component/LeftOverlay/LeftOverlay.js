/*  
💥 Title : LeftOverlay
📃 Description : Here the social Icons will be shown
✍ Author : Saad Hasan
⌚ Date : 22/ April/ 2021 
*/


/*  🔥 React Dependencies 🔥 */
import style from './LetOverlay.module.css'
import facebook from '../../image/facebook.svg'
import linkedin from '../../image/linkedin.svg'
import github from '../../image/github.svg'


const LeftOverlay = () => {
    return (
        <>
            <div className={style.LeftOverlay}>
                <div className={style.line}></div>
                <div className={style.socialIcons}>
                     <object type="image/svg+xml" data={github} className={style.github}>Github</object>
                     <object type="image/svg+xml" data={linkedin} className={style.linkedin}>Linkedin</object>
                     <object type="image/svg+xml" data={facebook} className={style.facebook}>Facebook</object>
                </div>
                <div className={style.line}></div>
            </div>
        </>
    );
};

export default LeftOverlay