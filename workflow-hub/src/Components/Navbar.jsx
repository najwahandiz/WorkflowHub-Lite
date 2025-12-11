import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {
    return (
        <nav className="Navbar">
            <div >
                 <img className='logo' src="/photo/logo.png" alt="logo" />
            </div>
            <div className='Nav-title'>
                <h1>WorkflowHub Lite</h1>
            </div>

            <div className='Nav-links'>
                <Link to="/" > Board</Link>
                <Link to="/corbeille"> Trash</Link>
            </div>


        </nav>
    )
}
