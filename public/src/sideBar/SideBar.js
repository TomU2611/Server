import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideBar.css';

const SideBar = () => {
    return (
        <div className="sidebar">
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content align-items-center">
                    <i className="bi bi-house-door"></i>
                    <span className="w-70 m-2">Home</span>
                    
                </li>
                <li className="list-group-item d-flex justify-content align-items-center">
                    <i className="bi bi-film"></i>
                    <span className="w-70 m-2">Shorts</span>
                </li>
                <li className="list-group-item d-flex justify-content align-items-center">
                    <i className="bi bi-plus-square"></i>
                    <span className="w-70 m-2">Subscriptions</span>
                </li>
                <li className="list-group-item d-flex justify-content align-items-center">
                    <i className="bi bi-youtube"></i>
                    <span className="w-70 m-2">You</span>
                    
                </li>
                <li className="list-group-item d-flex justify-content align-items-center">
                    <i className="bi bi-clock-history"></i>
                    <span className="w-70 m-2">History</span>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
