import React from 'react'
import { Outlet } from 'react-router-dom'
import Lottie from "lottie-react"
import animationData from '../snakes_and_ladders.json'

export default function Layout() {
    return (
        <>

            <Lottie animationData={animationData} />

            {localStorage.setItem("token", "ehab")}
            <Outlet />
        </>
    )
}