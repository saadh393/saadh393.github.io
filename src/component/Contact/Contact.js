/*  
💥 Title : Contact
📃 Description : Get In Touch
✍ Author : Saad Hasan
⌚ Date : 01/ May/ 2021 
*/

/*  🔥 React Dependencies 🔥 */
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <section className="centerInParent">
        <div className="contact-wrapper">
          <h1>Get In Touch 👋</h1>
          <p>
            I am interested in working with any company that thinks my skill will be helpful for them. If you are
            looking for someone like me, please let me know. Or you can just 'say hello' to me 😁
          </p>
          <a href="mailto:saadh393@gmail.com">
            <button>Say Hello </button>
          </a>
        </div>
      </section>
    </>
  );
};

export default Contact;
