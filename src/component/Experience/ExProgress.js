/*  
💥 Title : ExProgress
📃 Description : Experience Progress
✍ Author : Saad Hasan
⌚ Date : 27/ April/ 2021 
*/

/*  🔥 React Dependencies 🔥 */

const ExProgress = ({ title, progress }) => {
  return (
    <>
      <div className="exProgress-wrapper">
        <div className="flex spaceBetween">
          <p>{title}</p>
          <p>{`${progress}%`}</p>
        </div>
        <div className="exProgress-progressWrapper">
          <div className="currentProgress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </>
  );
};

export default ExProgress;
