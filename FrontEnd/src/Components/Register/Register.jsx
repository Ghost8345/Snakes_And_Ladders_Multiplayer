import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { registerUser } from "../../Api/userApi";


export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for handling form submission (e.g., API call, validation, etc.)
    console.log('Username:', userName);
    console.log('Password:', password);
    try {
      const response = await registerUser({
        userName,
        password
      })
      const message = await response.json()
      console.log(message)
    }
    catch (error) {
      console.log(error.message)
    }


  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <h1>Snake and Ladder Multiplayer Game</h1>
          <h2>Register</h2>
          <div className="col-md-4 p-4 bg-light">
            <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center mb-4">
                <label htmlFor="username">Username:</label>
                <input
                  className="form-control w-50"
                  type="text"
                  id="username"
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </div>
              <div className="d-flex justify-content-center mb-4" >
                <label htmlFor="password">Password:</label>
                <input
                  className="form-control w-50"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="d-flex justify-content-center mb-4">
                <button type="submit" id="btn" class="btn bg-main ">Register</button>
              </div>
              <p>Have an account?</p>
              <button type="button" id="btn" class="btn bg-main 4 " onClick={handleLoginClick}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}