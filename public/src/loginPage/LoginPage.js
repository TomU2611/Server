import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';


function LoginPage({users, setConnection}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        // Check if user exists
        const user = users.find(user => user.username === username);
        if (!user) {
            setMessage('User not found!');
            return;
        }

        // Check if password is correct
        if (user.password !== password) {
            setMessage('Wrong password!');
            return;
        }
        setConnection({ isConnected: true, user: username });
        // Redirect to home page
        setMessage('Login successful!');
        // Redirect to home page without refreshing
        navigate('/');
    };

   

    return (
        <div className="login-container">
            <Link to="/"><div className="youtube-icon"></div></Link>
            <form className="login-form" onSubmit={handleSubmit}>
                
                <h2>Sign In</h2>
                <div className="form-group">
                    <span>Username</span>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="form-group">
                    <span>Password</span>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div className="form-buttons">
                    <button type="button" onClick={handleSubmit}>Login</button>
                    <div to="/register">
                        <Link to="/register"><button type="submit">Register</button></Link>
                    </div>
                </div>
                {message && (
                <div className={message === 'Login successful!' ? 'valid-input-message' : 'invalid-input-message'}>
                    {message}
                </div>
                 )}
            </form>
            
        </div>
    );
}

export default LoginPage;