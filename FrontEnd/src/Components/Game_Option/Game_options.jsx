import React from "react";
import { useNavigate } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Login() {

    
    const navigate = useNavigate();

      

    const handleExitClick = () => {
        navigate("/Lobby");
      };


    return (
        <section>
                <div>

                <p>Exit game?</p>
                <button id="btn" class="btn bg-main text-white" onClick={handleExitClick}>Exit</button>
                
                </div>
        </section>
    )


}
