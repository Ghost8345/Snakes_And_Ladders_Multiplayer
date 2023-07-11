import React from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {

    const handleExitClick = () => {
        navigate("/login");
      };
      
    const navigate = useNavigate();

    return (
        <>
            <section id="home">
                <div className="boardContainer">
                <p>Exit game?</p>
                <button id="btn" class="btn bg-main text-white" type="Login" onClick={handleExitClick}>Login</button>
                </div>
            </section>
        </>
    )
}