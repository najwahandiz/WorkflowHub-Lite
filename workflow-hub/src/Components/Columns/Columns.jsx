import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import Card from '../CardTask/Card'
import './Columns.css'

const ItemTypes = { CARD: 'card' }
export default function Columns({status, task, openUpdatePop, openDeletePop, moveTask, changeTaskStatus }) {

  const ref = useRef(null)

     // make column a drop target
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop(item) {
      // if dropped on different status, change task status
      if (item.status !== status) {
        changeTaskStatus(item.id, status)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  drop(ref)


  // ensure tasks are sorted by order before mapping
  const sorted = (task || []).slice().sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
  
  return (
    <div ref={ref}
      className='taskColumn'
      style={{ backgroundColor: isOver ? '#e8f5e9' : 'transparent', transition: 'background-color 0.2s' }}>
        <h2 className='todoTitle'>To Do</h2>
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
