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

    
    const fetchTasks = () => {
        axios.get("http://localhost:3001/tasks")
        .then(res => setTasks(res.data))
        .catch(err => console.log("error in fitching data in home page",err))
    }

    useEffect(() => {
    fetchTasks()
    }, [])


    const addTask = async (newTask) => {
    try {
      const res = await axios.post("http://localhost:3001/tasks", newTask);

      // Add the task returned from server
      setTasks(prev => [...prev, res.data]);
      
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

        
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
                <Columns task={tasks.filter(t=>(t.status==="todo" && !t.isDeleted))} openUpdatePop={handelUpdateClick} openDeletePop={handelDeleteClick}  />
            </div>

            <div className='task-column-inprogress'>
                <InProgressCol task={tasks.filter(t=>(t.status==="in-progress" && !t.isDeleted))} openUpdatePop={handelUpdateClick} openDeletePop={handelDeleteClick}  />
            </div>

            <div className='task-column-done'>
                <DoneCol task={tasks.filter(t=>(t.status==="done" && !t.isDeleted))} openUpdatePop={handelUpdateClick} openDeletePop={handelDeleteClick}  />
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



