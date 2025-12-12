import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { FaHome, FaTrash } from 'react-icons/fa'

export default function Navbar() {
    return (
        <nav className="Navbar">

            <div className='Nav-title'>
                <h1>WorkflowHub Lite</h1>
            </div>

            <div className='Nav-links'>
                <Link to="/home"><FaHome /> Board</Link>
                <Link to="/corbeille"><FaTrash /> Trash</Link>
            </div>
        </nav>   
    )
}
