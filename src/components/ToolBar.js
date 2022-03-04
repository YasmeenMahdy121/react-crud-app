import React, { Fragment, Component } from 'react';
import './Styles/ToolBar.scss';
class ToolBar extends Component {
    state = {
        searchKeyword: '',
        searchStatus: false
    }
    // on change search input
    onChange = (e) => {
        this.setState({ searchKeyword: e.target.value })
    }
    //  click search button
    submitSearchKeyword = (e) => {
        e.preventDefault();
        if (this.state.searchKeyword != '') {
            this.props.setSearchKeyword(this.state.searchKeyword);
            this.setState({ searchKeyword: '', searchStatus: true })
        }
    }
    //  click reset search
    resetSearch = () => {
        this.props.resetSearchKeyword();
        this.setState({ searchKeyword: '', searchStatus: false })
    }
    render() {
        return (
            <section className='tool-bar py-3 row gy-4'>
                <div className='col-md-6 '>
                    {/* search form */}
                    <form className='d-flex' onSubmit={this.submitSearchKeyword}>
                        <input type='search' className='me-3' placeholder='Search' onChange={this.onChange} value={this.state.searchKeyword} />
                        <button type='submit' className='btn btns p-2 px-3 me-3'>Search</button>
                        {this.state.searchStatus ? (
                            <span onClick={this.resetSearch} className='reset-search text-muted d-flex align-items-center'>
                                Reset Search
                                <span className='d-block badge btns ms-1'>X</span>
                            </span>
                        ) : ''}
                    </form>
                </div>
                {/* create new user button */}
                <div className='col-md-6 d-flex justify-content-start justify-content-md-end'>
                    <button className='btn btns p-2 px-3' onClick={this.props.displayCreateForm}>Create New User</button>
                </div>
            </section>
        );
    }
}

export default ToolBar;