import { Component } from "react";
import "./Styles/Form.scss";
class CreatForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  };
  // control inputs function
  onchange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val });
  };
  // create user function
  createUser = (e) => {
    e.preventDefault();
    if (
      this.state.email &&
      this.state.first_name &&
      this.state.last_name &&
      this.state.avatar
    ) {
      let user = this.state;
      user.id = Math.random() * 10;
      this.props.createUser(user);
      // reset form
      e.target.reset();
      // reset state
      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        avatar: "",
      });
    }
  };
  render() {
    // distruct props
    const { display, cancelCreation } = this.props;
    let form;
    // create user form
    return (
      <section className={`modal ${display}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create User</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={this.createUser}>
                <div className="form-group">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    onChange={this.onchange}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    onChange={this.onchange}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-Mail</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onchange}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="avatar">Avatar</label>
                  <input
                    type="url"
                    className="form-control"
                    name="avatar"
                    onChange={this.onchange}
                  ></input>
                </div>
                <div className="p-3 py-4 d-flex justify-content-end">
                  <button type="submit" className="btn btns me-2 p-2 px-3">
                    Create
                  </button>
                  <button
                    type="button"
                    className="btn btns bg-danger p-2 px-3 text-white"
                    onClick={cancelCreation}
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
  }
}

export default CreatForm;
