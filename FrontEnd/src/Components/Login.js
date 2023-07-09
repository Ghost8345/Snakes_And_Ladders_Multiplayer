import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

      const handleRegisterClick = () => {
        navigate("/register");
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('Username:', username);
        console.log('Password:', password);
      };
      
      return (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Login</button>
            <button type = "button"  onClick={handleRegisterClick}>Register</button>
          </form>
        </div>
      );
}