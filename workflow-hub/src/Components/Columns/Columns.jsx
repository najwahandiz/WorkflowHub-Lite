import React from 'react'
import Card from '../CardTask/Card'
import './Columns.css'

export default function Columns({ task, openUpdatePop, openDeletePop }) {
  return (
    <div className='taskColumn'>
        <h2>To Do</h2>
        <hr />

        {task.map(taskItem=>(
            <Card key={taskItem.id} task={taskItem} openUpdatePop={openUpdatePop} openDeletePop={openDeletePop} />
   
        ))}
    </div>
  )
}
