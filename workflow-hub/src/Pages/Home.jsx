import React from 'react'
import Card from '../Components/CardTask/Card'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Columns from '../Components/Columns/Columns'
import InProgressCol from '../Components/Columns/InProgressCol'
import DoneCol from '../Components/Columns/DoneCol'
import './Home.css' 
 
export default function Home() {

    const [tasks, setTasks] = useState([])
    
        useEffect(()=>{
            axios.get("http://localhost:3001/tasks")
            .then(res=>setTasks(res.data))
             .catch(err=>console.log(err))
        },[])

        
  return (
    <div>
        <section className='title'>
            <h1>Task Board</h1>
            <h3>Manage your tasks with drag & drop</h3>
        </section>

        <section className='task-board'>
            <div className='task-column-todo'>
                <Columns task={tasks.filter(t=>(t.status==="todo"))} />
            </div>

            <div className='task-column-inprogress'>
                <InProgressCol task={tasks.filter(t=>(t.status==="in-progress"))} />
            </div>

            <div className='task-column-done'>
                <DoneCol task={tasks.filter(t=>(t.status==="done"))} />
            </div>
            
        </section>  

    </div>
  )
}



{/* <section className='task-board'>
    <div className='task-column todo'>
        <h2>To Do</h2>
        {tasks.map(task=>(
          <Card key={task.id} className="card-task" task={task} />
                                          
           ))}
                
    </div>
    <div className='task-column in-progress'>
        <h2>In Progress</h2>
        </div>
        <div className='task-column done'>
            <h2>Done</h2>
        </div>
</section>   */}