/*  
💥 Title : BlogLoader
📃 Description : Blog Image Loader
✍ Author : Saad Hasan
⌚ Date : 09/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import ContentLoader from "react-content-loader";

const BlogLoader = ({ props }) => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={350}
        height={160}
        viewBox="0 0 350 160"
        backgroundColor="#233554"
        foregroundColor="#00a76d"
        {...props}
      >
        <rect x="12" y="28" rx="3" ry="3" width="67" height="11" />
        <rect x="88" y="28" rx="3" ry="3" width="140" height="11" />
        <rect x="139" y="76" rx="3" ry="3" width="53" height="11" />
        <rect x="199" y="75" rx="3" ry="3" width="72" height="11" />
        <rect x="30" y="76" rx="3" ry="3" width="100" height="11" />
        <rect x="12" y="99" rx="3" ry="3" width="37" height="11" />
        <rect x="30" y="51" rx="3" ry="3" width="140" height="11" />
        <rect x="178" y="50" rx="3" ry="3" width="173" height="11" />
      </ContentLoader>
    </>
  );
};

export default BlogLoader;
