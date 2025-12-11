import { useState } from 'react';
import './AddPopUp.css'


function AddPopUp({ open, onClose, addTask }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");

  const handleTask = (e) => {
    e.preventDefault();
    addTask({ title, description, priority, status });
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className='pop-add'>
      <div className='popup-container'>
        <div className="popup-header">
          <h2>New Task</h2>
          <span className="close-btn" onClick={onClose}>x</span>
        </div>

        <form className='popup-form' onSubmit={handleTask}>
          
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="row">
            <div className="column">
              <label>Priority</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Urgent">Urgent</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="column">
              <label>Status</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div className="btn-row">
            <button type="button" className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className='create-btn'>
              Create Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddPopUp;