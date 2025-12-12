import React , { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import './Card.css'

const ItemTypes = { CARD: 'card' }

export default function Card({task,openUpdatePop, openDeletePop , moveTask, index}) {
  const ref = useRef(null)

  // drop target: accept cards of same type
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      // only reorder inside same column/status
      if (!item || item.status !== task.status) return

      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      // determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      if (!hoverBoundingRect) return
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      // only call moveTask when cursor crosses half of target
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      // perform the move
      moveTask(item.status, dragIndex, hoverIndex)

      // update the dragged item's index for further hovers
      item.index = hoverIndex
    }
  })

  // drag source
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id: task.id, index, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))


  return (
    <div>
    
        <div ref={ref} className={`card-task ${task.priority.toLowerCase()}`} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            
            <div className='divBtn'>
              <h5 className={`priority-badge priority-${task.priority.toLowerCase()}`}> {task.priority}</h5>
              <button className='updateBtn' onClick={()=>openUpdatePop(task)} >Update</button>
              <button className='deleteBtn' onClick={()=>openDeletePop(task)}>Delete</button>
            </div>
        </div>
    
    </div>
  )
}
