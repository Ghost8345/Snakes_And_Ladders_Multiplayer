import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../Api/userApi";

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUserName(e.target.value);
      };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

      const handleRegisterClick = () => {
        navigate("/register");
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('Username:', userName);
        console.log('Password:', password);

        try{
          const response = await logInUser({
            userName,
            password
          })
          const responseBody = await response.json()
          console.log(responseBody)
          localStorage.setItem('token', responseBody.token)
          navigate("/game")
        }
        catch(error){
          console.log(error.message)
        }
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
                value={userName}
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