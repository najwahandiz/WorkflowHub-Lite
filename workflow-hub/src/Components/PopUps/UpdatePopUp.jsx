import React, { use } from 'react'
import { useState ,useEffect } from 'react'
import './PopUp.css'
import axios from 'axios'

export default function UpdatePopUp({task, closePopUp ,fetchTasks}) {

    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description ,
        priority: task.priority || 'Low',
        status: task.status || 'todo'
    })

        // Handle input changes
    const handleChange =(e)=>{
        const {name, value}=e.target
        setFormData(prev=>({
            ...prev,
            [name]:value
        }))
    }
    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:3001/tasks/${task.id}`, formData)
        .then(res=>{
            console.log(res.data)
            fetchTasks()
            closePopUp()
        })
        .catch(err=>console.log("error fitching data",err))
    
    }
    
    
  return (
    <div className='popUpOverlay'>
        <div className='popUpContainer'>
            <h2>Edit Task</h2>

            <form onSubmit={handleSubmit} className='popUpForm'>
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}/>

                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

                <label>Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="todo">To do</option>
                    <option value="in-progress">In progress</option>
                    <option value="done">Done</option>
                </select>
                <div className='popUpBtnContainer'>
                    <button type="submit" className='saveBtn'>Save</button>
                    <button type="button" className='cancelBtn' onClick={closePopUp}>Cancel</button>
                </div>
            </form>
        </div>
            
    </div>
  )
}
