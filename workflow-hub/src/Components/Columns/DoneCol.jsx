import React from 'react'
import Card from '../CardTask/Card'

export default function DoneCol({task}) {
  return (
    <div className='taskColumn'>
        <h2>Done</h2>
        <hr />

        {task.map(taskItem=>(
            <Card key={taskItem.id} task={taskItem} />
        ))}

    </div>
  )
}
