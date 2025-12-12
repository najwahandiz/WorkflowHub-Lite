import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Corbeille.css'

export default function Corbeille() {
  const [deletedTasks, setDeletedTasks] = useState([])

  const fetchDeletedTasks = () => {
    axios.get("http://localhost:3001/tasks")
      .then(res => {
        const deleted = res.data.filter(t => t.isDeleted === true)
        setDeletedTasks(deleted)
      })
      .catch(err => console.log("error fetching deleted tasks", err))
  }

  useEffect(() => {
    fetchDeletedTasks()
  }, [])

  const restoreTask = (task) => {
    axios.put(`http://localhost:3001/tasks/${task.id}`, {
      ...task,
      isDeleted: false,
      status: "todo" 
    })
      .then(res => {
        console.log('Task restored:', res.data)
        fetchDeletedTasks()
      })
      .catch(err => console.log("error restoring task", err))
  }

  const permanentDelete = (taskId) => {
    axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(res => {
        console.log('Task permanently deleted')
        fetchDeletedTasks()
      })
      .catch(err => console.log("error permanently deleting task", err))
  }

  return (
    <div className='corbeille-container'>
      <h1>Trash</h1>
      {deletedTasks.length === 0 ? (
        <p>No deleted tasks</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deletedTasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>
                  <button 
                    className='restoreBtn'
                    onClick={() => restoreTask(task)}
                  >
                    Restore
                  </button>
                  <button 
                    className='deleteBtn'
                    onClick={() => permanentDelete(task.id)}
                  >
                    Delete Permanently
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}