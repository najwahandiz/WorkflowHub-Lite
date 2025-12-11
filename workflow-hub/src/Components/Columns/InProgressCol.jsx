import React from 'react'
import Card from '../CardTask/Card'

export default function InProgressCol({task, openUpdatePop, openDeletePop}) {
  return (
    <div className='taskColumn'>
        <h2>In Progress</h2>
        <hr />

        {task.map((taskItem)=>(
            <Card  key={taskItem.id} task={taskItem} openUpdatePop={openUpdatePop} openDeletePop={openDeletePop}/>
        ))}
        
    </div>
  )
}
