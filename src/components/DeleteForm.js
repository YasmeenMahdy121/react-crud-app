import "./Styles/Form.scss";

const DeleteForm = (props) => {
  // delete user function
  const deleteUser = (e) => {
    e.preventDefault();
    props.deleteUser(props.userData);
  };
  // distruct props
  const { display, userData, cancelDeletion } = props;
  return (
    <section className={`modal ${display}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete User</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={deleteUser}>
              <p className="py-4">
                Are you sure you want to delete{" "}
                {`${userData.first_name} ${userData.last_name}`}?
              </p>
              <div className="p-3 py-0 d-flex justify-content-end">
                <button type="submit" className="btn btns me-2 p-2 px-3">
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btns bg-danger p-2 px-3 text-white"
                  onClick={cancelDeletion}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteForm;
