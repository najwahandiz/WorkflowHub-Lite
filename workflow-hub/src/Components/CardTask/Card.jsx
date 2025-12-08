import React from 'react'
import './Card.css'

export default function Card({ task }) {

  return (
    <div>
    
        <div className="card-task">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <h5>Priority: {task.priority}</h5>
        </div>
    
    </div>
  )
}
