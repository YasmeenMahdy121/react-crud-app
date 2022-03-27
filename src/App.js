import { Component, Fragment } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Header from "./components/Header";
import ToolBar from "./components/ToolBar";
import UsersDetails from "./components/UsersDetails";
import Footer from "./components/Footer";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import DeleteForm from "./components/DeleteForm";
import SuccessMessage from "./components/SuccessMessage";
import "./App.scss";
//////////////////////////////////////////////////////////////stopppppp///////////////////////////////////////
class App extends Component {
  state = {
    users: [],
    searchKeyword: "",
    createForm: "d-none",
    updateForm: "d-none",
    confirmDeletion: "d-none",
    userData: "",
    SuccessMessagePopup: "d-none",
    loading: "",
  };
  // fetch data
  async componentDidMount() {
    const { data } = await axios.get("./users.json");
    setTimeout(() => {
      this.setState({ users: data.users, loading: "d-none" });
    }, 1000);
  }
  // set Search Keyword
  setSearchKeyword = (searchKeyword) => {
    this.setState({ searchKeyword });
  };
  // reset Search Keyword
  resetSearchKeyword = () => {
    this.setState({ searchKeyword: "" });
  };
  //  display create user Form
  displayCreateForm = () => {
    this.setState({ createForm: "d-block", userFormStatus: "created" });
  };
  // create user function
  createUser = (user) => {
    const users = this.state.users;
    users.push(user);
    this.setState({
      users,
      createForm: "d-none",
      SuccessMessagePopup: "d-block",
    });
  };
  // cancel creation
  cancelCreation = () => {
    this.setState({ createForm: "d-none", userFormStatus: "" });
  };
  //  display update user Form
  displayUpdateForm = (user) => {
    this.setState({
      updateForm: "d-block",
      userData: user,
      userFormStatus: "updated",
    });
  };
  // update user function
  updateUser = (user) => {
    const users = this.state.users;
    users.map((u) => {
      if (u.id === user.id) {
        u.first_name = user.first_name;
        u.last_name = user.last_name;
        u.email = user.email;
        u.avatar = user.avatar;
      }
    });
    this.setState({
      users,
      updateForm: "d-none",
      userData: "",
      SuccessMessagePopup: "d-block",
    });
  };
  // cancel update
  cancelUpdate = () => {
    this.setState({ updateForm: "d-none", userData: "", userFormStatus: "" });
  };
  //  display confirm delete form
  displayConfirmDeleteForm = (user) => {
    this.setState({
      confirmDeletion: "d-block",
      userData: user,
      userFormStatus: "deleted",
    });
  };
  // delete user function
  deleteUser = (user) => {
    let users = this.state.users;
    users = users.filter((u) => u.id !== user.id);
    this.setState({
      users,
      confirmDeletion: "d-none",
      userData: "",
      SuccessMessagePopup: "d-block",
    });
  };
  // cancel deletion
  cancelDeletion = () => {
    this.setState({
      confirmDeletion: "d-none",
      userData: "",
      userFormStatus: "",
    });
  };
  // hide success message
  undisplaySuccessMessage = () => {
    this.setState({ userFormStatus: "", SuccessMessagePopup: "d-none" });
  };
  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} />
        <div className={`App ${this.state.loading === "" ? "d-none" : ""}`}>
          <Header />
          <section className="container">
            <ToolBar
              setSearchKeyword={this.setSearchKeyword}
              resetSearchKeyword={this.resetSearchKeyword}
              displayCreateForm={this.displayCreateForm}
            />
            <UsersDetails
              users={this.state.users}
              searchKeyword={this.state.searchKeyword}
              displayUpdateForm={this.displayUpdateForm}
              displayConfirmDeleteForm={this.displayConfirmDeleteForm}
            />
            <CreateForm
              display={this.state.createForm}
              cancelCreation={this.cancelCreation}
              createUser={this.createUser}
            />
            <UpdateForm
              display={this.state.updateForm}
              userData={this.state.userData}
              cancelUpdate={this.cancelUpdate}
              updateUser={this.updateUser}
            />
            <DeleteForm
              display={this.state.confirmDeletion}
              userData={this.state.userData}
              cancelDeletion={this.cancelDeletion}
              deleteUser={this.deleteUser}
            />
            <SuccessMessage
              display={this.state.SuccessMessagePopup}
              userFormStatus={this.state.userFormStatus}
              undisplaySuccessMessage={this.undisplaySuccessMessage}
            />
          </section>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default App;
