import React from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router'
export default function Home() {
    const navigate = useNavigate()

    return (

        <div className={styles.home}>
            <div className={`d-flex justify-content-center align-items-center ${styles.layer} `}>
                <div className="content">
                    <button className='btn btn-light mx-2' onClick={() => {
                        navigate("/createGame")
                    }}>Create Game</button>
                    <button className='btn btn-info' onClick={() => {
                        navigate("/lobby")
                    }}>Join Game </button>
                </div>

            </div>
        </div>
    )
}