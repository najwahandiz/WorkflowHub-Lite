import React from 'react'
import './Card.css'


export default function Card({task,openUpdatePop, openDeletePop}) {

  return (
    <div>
    
        <div className="card-task">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <div className='divBtn'>
              <h5> {task.priority}</h5>
              <button className='updateBtn' onClick={()=>openUpdatePop(task)} >Update</button>
              <button className='deleteBtn' onClick={()=>openDeletePop(task)}>Delete</button>
            </div>
        </div>
    
    </div>
  )
}
