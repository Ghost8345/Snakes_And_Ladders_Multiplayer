import React from 'react'
import styles from './CreateGame.module.css'
export default function CreateGame() {
    return (
        <div className={styles.home}>
            <div className={`d-flex justify-content-center align-items-center ${styles.layer} `}>
                <div className="content">
                    <label htmlFor="" className='text-white fw-bolder'>Enter Number Of Players:</label>
                    <input type="text" className='form-control mb-3' />
                    <button className='btn   btn-info'>CREATE</button>
                </div>

            </div>
        </div>
    )
}
