import React from 'react'
import Card from '../Components/CardTask/Card'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Columns from '../Components/Columns/Columns'
import InProgressCol from '../Components/Columns/InProgressCol'
import DoneCol from '../Components/Columns/DoneCol'
import UpdatePopUp from '../Components/PopUps/UpdatePopUp'
import DeletePopUp from '../Components/PopUps/deletePopUp'
import AddPopUp from '../Components/PopUps/AddPopUp'
import './Home.css' 
 
export default function Home() {

    const[showUpdatePopUp, setShowUpdatePopUp]=useState(false)
    const[showDeletePopUp, setShowDeletePopUp]=useState(false)
    const[taskToUpdate, setTaskToUpdate]=useState(null)
    const[taskToDelete, setTaskToDelete]=useState(null)
    
    const [tasks, setTasks] = useState([])
    const [open, setOpen] = useState(false);

    function handelUpdateClick(task){
        setTaskToUpdate(task)
        setShowUpdatePopUp(true)
    }

    
    function handelDeleteClick(task){
        setTaskToDelete(task)
        setShowDeletePopUp(true)
    }

    
    async function fetchTasks () {
        try{
          const res= await axios.get("http://localhost:3001/tasks") 
          setTasks(res.data)       
        
        }catch(err){
          console.log("error fitching tasks",err)
        }
    } 


    useEffect(() => {
    fetchTasks()
    }, [])



    const addTask = async (newTask) => {
    try {
      const taskWithDefaults = {
        ...newTask,
        isDeleted: false,
        // order: 999
      };
      await axios.post("http://localhost:3001/tasks", taskWithDefaults);
      fetchTasks(); // Refresh to get all tasks properly
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

   // moveTask: reorder tasks inside the same column (status)
  const moveTask = (status, fromIndex, toIndex) => {
    // get column tasks sorted by order
    const columnTasks = tasks
      .filter(t => t.status === status && !t.isDeleted)
      .slice()
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))

    // defensive checks
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= columnTasks.length || toIndex >= columnTasks.length) return

    // reorder locally
    const moved = columnTasks.splice(fromIndex, 1)[0]
    columnTasks.splice(toIndex, 0, moved)

    // assign new sequential orders starting at 1
    const updates = columnTasks.map((t, idx) => ({ ...t, order: idx + 1 }))

    // build new tasks array: replace tasks of the column with updated orders
    const otherTasks = tasks.filter(t => t.status !== status || t.isDeleted)
    const newTasks = [...otherTasks, ...updates]

    // set UI state immediately
    setTasks(newTasks)

    // persist changes to server (update each task in that column)
    Promise.all(updates.map(t => axios.put(`http://localhost:3001/tasks/${t.id}`, t)))
      .then(() => {
        // optionally re-fetch to ensure sync or just leave local state
        // fetchTasks()
      })
      .catch(err => {
        console.error('Error persisting order updates', err)
        // optionally re-fetch to recover
        // fetchTasks()
      })
  }


    
  return (
    <div>
        <section className='heroSection'>
            <div>
              <h1>Task Board</h1>
              <h3>Manage your tasks with drag & drop</h3>
            </div>
            <button className='addBtn' onClick={() => setOpen(true)}>Add Task</button>
        </section>

        <section className='task-board'>
            <div className='task-column-todo'>
                <Columns
                    task={tasks.filter(t=>(t.status==="todo" && !t.isDeleted))} 
                    openUpdatePop={handelUpdateClick} 
                    openDeletePop={handelDeleteClick} 
                    moveTask={moveTask} 
                />
            </div>

            <div className='task-column-inprogress'>
                <InProgressCol
                     task={tasks.filter(t=>(t.status==="in-progress" && !t.isDeleted))} 
                     openUpdatePop={handelUpdateClick} 
                     openDeletePop={handelDeleteClick}
                     moveTask={moveTask}
                />
            </div>

            <div className='task-column-done'>
                <DoneCol 
                    task={tasks.filter(t=>(t.status==="done" && !t.isDeleted))}
                    openUpdatePop={handelUpdateClick}
                    openDeletePop={handelDeleteClick}
                    moveTask={moveTask}
                />
            </div>
       
        </section>  
      <div className='sectionPopUp'>
        {showUpdatePopUp && <UpdatePopUp task={taskToUpdate} closePopUp={()=>setShowUpdatePopUp(false)} fetchTasks={fetchTasks} />}
        {showDeletePopUp && <DeletePopUp task={taskToDelete} closePopUp={()=>setShowDeletePopUp(false)} fetchTasks={fetchTasks} /> }
        <AddPopUp open={open} onClose={() => setOpen(false)} addTask={addTask} />
      </div>    

    </div>

  )
}



