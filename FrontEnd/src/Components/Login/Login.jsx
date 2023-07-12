import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../../Api/userApi";
import { MDBBtn } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


// var canvas = document.querySelector('canvas');
// var context = canvas.getContext('2d');
// var centerX = canvas.width / 2;
// var centerY = canvas.height / 2;
// var radius = 30;
// context.beginPath(),
// context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false),
// context.fillStyle = 'skyblue',
// context.fill(),
// context.lineWidth = 5,
// context.strokeStyle = '#030',
// context.stroke(),



export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };


  const handleLoginClick = () => {
    console.log('Username:', userName);
    console.log('Password:', password);
    navigate("/lobby");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for handling form submission (e.g., API call, validation, etc.)
    console.log('Username:', userName);
    console.log('Password:', password);

    try {
      const response = await logInUser({
        userName,
        password
      })
      const responseBody = await response.json()
      console.log(responseBody)
      localStorage.setItem('token', responseBody.token)
      navigate("/game")
    }
    catch (error) {
      console.log(error.message)
    }
  };

  return (


    <>


      <section>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <h1>Snake and Ladder Multiplayer Game</h1>
            <h2>Login</h2>
            <div className="col-md-4 p-4 bg-light">
              <form onSubmit={handleSubmit} className="">
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
                <div className="d-flex justify-content-center mb-4">
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
                  <button type="submit" id="btn" class="btn bg-main " onClick={handleLoginClick}>Login</button>

                </div>
                <p>Or create a new account</p>
                <button className="btn  bg-main" id="btn" onClick={handleRegisterClick}>Register</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div>


        <div id="pages">

        </div>

      </div>
    </>

  );
}