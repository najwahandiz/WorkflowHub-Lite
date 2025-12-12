import React from 'react'
import Card from '../CardTask/Card'

export default function InProgressCol({task, openUpdatePop, openDeletePop, moveTask}) {

  // ensure tasks are sorted by order before mapping
  const sorted = (task || []).slice().sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))

  return (
    <div className='taskColumn'>
        <h2 className='inProgressTitle'>In Progress</h2>
        <hr />

        {sorted && sorted.length > 0 ?  
           sorted.map((taskItem, index)=>(
                    <Card
                      key={taskItem.id} 
                      task={taskItem} 
                      index={index}
                      openUpdatePop={openUpdatePop} 
                      openDeletePop={openDeletePop}  
                      moveTask={moveTask} 
                    />
           
                )) : <h3>No tasks available</h3>}     
        
    </div>
  )
}
