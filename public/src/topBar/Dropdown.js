import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dropdown.css';
import { useNavigate } from 'react-router-dom';
const Dropdown = ({ theme,setTheme,toggleDarkMode, connection,setConnection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleRedirection = (path) => {
    navigate(path);
  };
  const toggleDropdown = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };
  const handleLogout= () => {
    setConnection({ isConnected: false, user: '' });
    handleRedirection("/login");
  }
 
  const handleDarkMode= ()=> {
    setTheme((theme === "light" ? "dark" : "light"));
  }
  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <button className="btn" type="button" onClick={toggleDropdown}>
        <i className="bi bi-sliders" style={{ fontSize: '2rem', marginLeft: '-35px', padding: '5px'}}></i>
      </button>

      <div className={`offcanvas offcanvas-start ${isOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
        <div className="offcanvas-header">
          <button type="button" className="btn-close text-reset" onClick={toggleDropdown} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
         
            <li onClick={() => handleRedirection("/")} className="list-group-item d-flex justify-content align-items-center">
              
              <i className="bi bi-house-door"></i>
              <span className="w-70 m-2">Home</span>
              
            </li>
            {!connection.isConnected && (
              <li  onClick={() => handleRedirection("/login")} className="list-group-item d-flex justify-content align-items-center">
                <i className="bi bi-door-open"></i>
                <span className="w-70 m-2">Sign In</span>
              </li>
            )}
            {connection.isConnected && (
              <li onClick={handleLogout} className="list-group-item d-flex justify-content align-items-center">
                <i className="bi bi-door-closed"></i>
                <span className="w-70 m-2">Sign Out</span>
              </li>
            )}
            {!connection.isConnected && (
              <li onClick={() => handleRedirection("/register")} className="list-group-item d-flex justify-content align-items-center">
                <i className="bi bi-r-circle"></i>
                <span className="w-70 m-2">Register</span>
              </li>
            )}
           
           {connection.isConnected && (
            <li onClick={() => handleRedirection("/add")} className="list-group-item d-flex justify-content align-items-center">
              
              <i class="bi bi-plus-circle"></i>
              <span className="w-70 m-2">Add Video</span>
              
            </li>
           )}
            <li onClick={handleDarkMode} className="list-group-item d-flex justify-content align-items-center">
              <button  className="btn" style={{ background: 'none', border: 'none' }}>
                <i className="bi bi-cloud-moon"></i>
                <span className="w-70 m-2">Dark mode</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
