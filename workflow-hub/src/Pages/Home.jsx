import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "../Components/PopUps/AddPopUp";
import "./Home.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Load tasks when page loads
  useEffect(() => {
    axios.get("http://localhost:3001/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.log("Error fetching tasks:", err));
  }, []);

  // Add a new task
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
    <div className="Task">
      <h1>Task Board</h1>

      <button onClick={() => setOpen(true)}>Add Task</button>

      <Popup open={open} onClose={() => setOpen(false)} addTask={addTask} />

      
    </div>
  );
}













// import React, { useState } from 'react'
// import Popup from '../Components/PopUps/AddPopUp'
// import "./Home.css"

// export default function Home() {

//   const [open, setOpen] = useState(false);
//   const [tasks, setTasks] = useState([]);

//   const addTask = (newTask) => {
//     setTasks([...tasks, newTask]);
//   };

//   return (
//     <div className='Task'>
//       <h1>Task Board</h1>

//       <button onClick={() => setOpen(true)}>Add Task</button>

//       <Popup
//         open={open}
//         onClose={() => setOpen(false)}
//         addTask={addTask}
//       />
//     </div>
//   );
// }