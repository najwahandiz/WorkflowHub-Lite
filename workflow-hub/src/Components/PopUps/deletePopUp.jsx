import axios from 'axios'
import React from 'react'
import './PopUp.css'

export default function deletePopUp({task, closePopUp, fetchTasks}) {

  const moveToTrash = () => {
    axios.put(`http://localhost:3001/tasks/${task.id}`,{
        ...task,
        isDeleted:true
    })
         .then(res=>{
              console.log("task moved to trash",res.data)
              fetchTasks()
              closePopUp()
         })
          .catch(err=>console.log("error moving task",err))
  }        


  return (
    <div className='popUpOverlay'>
      <div className='popUpContainer'>
        <h2>Delete Task</h2>
        <p>Are you sure you want to delete "<strong>{task.title}</strong>"? This will move it to the trash.</p>
        <div className='popUpBtnContainer'>
          <button className='saveBtn'  onClick={closePopUp}>Cancel</button>
          <button className='cancelBtn' onClick={moveToTrash}>Move to Trash</button>
        </div>


      </div>
    </div>
  )
}
