import "./Styles/SuccessMessage.scss";
import { AiOutlineCheckCircle } from "react-icons/ai";
const SuccessMessage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    props.undisplaySuccessMessage();
  };
  return (
    <section
      className={`modal-delete ${props.display}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-content py-5">
        <form
          onSubmit={onSubmit}
          className="w-100 d-flex flex-column align-items-center justify-content-center"
        >
          <AiOutlineCheckCircle className="icon"/>
          <p className="py-4">User {props.userFormStatus} successfully.</p>
          <button type="submit" className="btn btns me-2 p-2 px-5">
            OK
          </button>
        </form>
      </div>
    </section>
  );
};
export default SuccessMessage;
