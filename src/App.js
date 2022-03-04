import { Component, Fragment } from 'react';
import axios from 'axios';
import Loading from './components/Loading'
import Header from './components/Header';
import ToolBar from './components/ToolBar';
import UsersDetails from './components/UsersDetails';
import Footer from './components/Footer';
import CreateUpdateDeleteForm from './components/CreateUpdateDeleteForm';
import SuccessMessage from './components/SuccessMessage'
import './App.scss';

class App extends Component {
  state = {
    users: [],
    searchKeyword: "",
    formPopup: "d-none",
    userFormStatus: "",
    displayDeletePopup: "d-none",
    userData: "",
    SuccessMessagePopup: "d-none",
    loading: ""
  }
  // fetch data
  async componentDidMount() {
    const { data } = await axios.get('./users.json');
    this.setState({ users: data.users, loading: 'd-none' })
  }
  // set Search Keyword
  setSearchKeyword = searchKeyword => {
    this.setState({ searchKeyword })
  }
  // reset Search Keyword
  resetSearchKeyword = () => {
    this.setState({ searchKeyword: '' })
  }
  //  display create user Form
  displayCreateForm = () => {
    if (this.state.formPopup === 'd-none') {
      this.setState({ formPopup: "d-block", userFormStatus: "created" })
    }
  }
  // create user
  createUser = user => {
    const users = this.state.users
    users.push(user)
    this.setState({ users, formPopup: "d-none", SuccessMessagePopup: "d-block" })
  }
  //  display update user Form
  displayUpdateForm = user => {
    if (this.state.formPopup === 'd-none') {
      this.setState({ formPopup: "d-block", userFormStatus: "updated", userData: user })
    }
  }
  // update user
  updateUser = user => {
    const users = this.state.users
    users.map(u => {
      if (u.id === user.id) {
        u.first_name = user.first_name
        u.last_name = user.last_name
        u.email = user.email
        u.avatar = user.avatar
      }
    })
    this.setState({ users, formPopup: "d-none", userData: '', SuccessMessagePopup: "d-block" })
  }
  //  display confirm delete form
  displayConfirmDeleteForm = user => {
    if (this.state.formPopup === 'd-none') {
      this.setState({ formPopup: "d-block", userFormStatus: "deleted", userData: user })
    }
  }
  // update user
  deleteUser = user => {
    let users = this.state.users
    users = users.filter(u => u.id !== user.id)
    this.setState({ users, formPopup: "d-none", userData: '', SuccessMessagePopup: "d-block" })
  }
  // undisplay the form popup form
  undisplayForm = () => {
    this.setState({ formPopup: "d-none", userFormStatus: "", userData: '' })
  }
  // hide success message
  undisplaySuccessMessage = () => {
    this.setState({ userFormStatus: "", SuccessMessagePopup: "d-none" })
  }
  render() {
    return (
      <Fragment>
        <Loading loading={this.state.loading} />
        <div className={`App ${this.state.loading === '' ? 'd-none' : ''}`}>
          <Header />
          <section className='container'>
            <ToolBar setSearchKeyword={this.setSearchKeyword} resetSearchKeyword={this.resetSearchKeyword} displayCreateForm={this.displayCreateForm} />
            <UsersDetails users={this.state.users} searchKeyword={this.state.searchKeyword} displayUpdateForm={this.displayUpdateForm} displayConfirmDeleteForm={this.displayConfirmDeleteForm} />
            <CreateUpdateDeleteForm display={this.state.formPopup} userFormStatus={this.state.userFormStatus} userData={this.state.userData} undisplayForm={this.undisplayForm} createUser={this.createUser} updateUser={this.updateUser} deleteUser={this.deleteUser} />
            <SuccessMessage display={this.state.SuccessMessagePopup} userFormStatus={this.state.userFormStatus} undisplaySuccessMessage={this.undisplaySuccessMessage} />
          </section>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default App;