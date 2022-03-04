import React, { Component } from 'react';
import './Styles/CreateUpdateDeleteForm.scss'
class CreateUpdateDeleteForm extends Component {
    state = {}
    // control inputs function
    onchange = e => {
        const name = e.target.name
        const val = e.target.value
        this.setState({ [name]: val })
    }
    // create user function
    createUser = (e) => {
        e.preventDefault();
        if (this.state.email && this.state.first_name && this.state.last_name && this.state.avatar) {
            let user = this.state
            user.id = Math.random() * 10
            this.props.createUser(user)
            // reset form
            e.target.reset();
        }
    }
    // update user function
    updateUser = (e) => {
        e.preventDefault();
        // check if inputs not empty
        if (this.state.email !== '' && this.state.first_name !== '' && this.state.last_name !== '' && this.state.avatar !== '') {
            this.props.updateUser({
                id: this.props.userData.id,
                email: this.state.email !== undefined ? this.state.email : this.props.userData.email,
                first_name: this.state.first_name !== undefined ? this.state.first_name : this.props.userData.first_name,
                last_name: this.state.last_name !== undefined ? this.state.last_name : this.props.userData.last_name,
                avatar: this.state.avatar !== undefined ? this.state.avatar : this.props.userData.avatar
            })
            // reset state
            let user = this.state
            delete user.id
            delete user.first_name
            delete user.last_name
            delete user.email
            delete user.avatar
            this.setState(user)
            // reset form
            e.target.reset();
            // console.log(this.state)
        }
    }
    // delete user function
    deleteUser = (e) => {
        e.preventDefault();
        this.props.deleteUser(this.props.userData)
    }
    render() {
        // distruct props
        const { display, userFormStatus, userData, undisplayForm } = this.props
        let form;
        // create user form
        if (userFormStatus === 'created') {
            form = (
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create User</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.createUser}>
                            <div className="form-group">
                                <label htmlFor="first-name">First Name</label>
                                <input type="text" className="form-control" name="first_name" onChange={this.onchange}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name">Last Name</label>
                                <input type="text" className="form-control" name="last_name" onChange={this.onchange}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-Mail</label>
                                <input type="email" className="form-control" name="email" onChange={this.onchange}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="avatar">Avatar</label>
                                <input type="url" className="form-control" name="avatar" onChange={this.onchange}></input>
                            </div>
                            <div className="p-3 py-4 d-flex justify-content-end">
                                <button type="submit" className="btn btns me-2 p-2 px-3">Create</button>
                                <button type="button" className="btn btns bg-danger p-2 px-3 text-white" onClick={undisplayForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        // update user form
        else if (userFormStatus === 'updated') {
            form = (
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update User</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.updateUser}>
                            <div className="form-group">
                                <label htmlFor="first-name">First Name</label>
                                <input type="text" className="form-control" defaultValue={userData.first_name} name="first_name" onChange={this.onchange}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name">Last Name</label>
                                <input type="text" className="form-control" defaultValue={userData.last_name} name="last_name" onChange={this.onchange}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-Mail</label>
                                <input type="email" className="form-control" defaultValue={userData.email} name="email" onChange={this.onchange}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="avatar">Avatar</label>
                                <input type="url" className="form-control" defaultValue={userData.avatar} name="avatar" onChange={this.onchange}></input>
                            </div>
                            <div className="p-3 py-4 d-flex justify-content-end">
                                <button type="submit" className="btn btns me-2 p-2 px-3">Update</button>
                                <button type="button" className="btn btns bg-danger p-2 px-3 text-white" onClick={undisplayForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        // delete user form
        else {
            form = (
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete User</h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.deleteUser}>
                            <p className='py-4'>Are you sure you want to delete {`${userData.first_name} ${userData.last_name}`}?</p>
                            <div className="p-3 py-0 d-flex justify-content-end">
                                <button type="submit" className="btn btns me-2 p-2 px-3">Delete</button>
                                <button type="button" className="btn btns bg-danger p-2 px-3 text-white" onClick={undisplayForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        return (
            <section className={`modal ${display}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    {form}
                </div>
            </section>
        );
    }
}

export default CreateUpdateDeleteForm;