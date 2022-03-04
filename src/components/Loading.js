import React from 'react';
import './Styles/Loading.scss'
const Loading = (props) => {
    return (
        // loader
        <div className={`loader-container ${props.loading}`}>
            <div className="loader"></div>
        </div>
    );
}

export default Loading;