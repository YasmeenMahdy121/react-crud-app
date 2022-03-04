import React, { Component } from 'react';
import './Styles/Header.scss';
class Header extends Component {
    render() {
        return (
            <header>
                <div className='container'>
                    <h1>React CRUD App</h1>
                </div>
            </header>
        );
    }
}

export default Header;