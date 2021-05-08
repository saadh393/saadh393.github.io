/*  
💥 Title : ProfilePicLoader
📃 Description : 
✍ Author : Saad Hasan
⌚ Date : 08/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import ContentLoader from "react-content-loader";

const ProfilePicLoader = (props) => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={300}
        height={300}
        viewBox="0 0 300 300"
        backgroundColor="#233554"
        foregroundColor="#00a76d"
        style={{ position: "absolute" }}
        {...props}
      >
        <rect x="41" y="211" rx="3" ry="3" width="200" height="6" />
        <circle cx="151" cy="100" r="95" />
        <rect x="29" y="227" rx="3" ry="3" width="250" height="6" />
        <rect x="41" y="245" rx="3" ry="3" width="220" height="6" />
      </ContentLoader>
    </>
  );
};

export default ProfilePicLoader;
