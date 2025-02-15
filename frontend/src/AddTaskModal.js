// src/components/AddTaskModal.js
import React, { useState } from 'react';

function AddTaskModal({ closeModal }) {
  const [taskName, setTaskName] = useState('');
  const [taskHours, setTaskHours] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskTime, setTaskTime] = useState('None'); // Default value "None"

  const handleSubmit = () => {
    // Save task to your task management (can use state, localStorage, or send to backend)
    console.log('Task added:', { taskName, taskHours, taskPriority, taskTime });
    closeModal(); // Close modal after task is added
  };

  return (
    <div className="add-task-modal">
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Hours"
        value={taskHours}
        onChange={(e) => setTaskHours(e.target.value)}
      />
      <select
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
      >
        <option value="">Select Priority</option>
        <option value="important">Important</option>
        <option value="medium">Medium</option>
        <option value="leastImportant">Least Important</option>
      </select>
      <select
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
      >
        <option value="None">None (AI to Handle)</option>
        <option value="morning">Morning (9 AM - 12 PM)</option>
        <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
        <option value="evening">Evening (5 PM - 9 PM)</option>
      </select>
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}

export default AddTaskModal;
