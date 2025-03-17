import React, { useState } from 'react';

function AITasks() {
  const [aiTasks, setAiTasks] = useState([]);

  const addAITask = (task) => {
    setAiTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const task = {
      name: event.target.taskName.value,
      hours: event.target.taskHours.value,
      priority: event.target.taskPriority.value,
    };

    addAITask(task);
  };

  return (
    <div>
      <h2>AI Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Task Name"
          required
        />
        <input
          type="number"
          name="taskHours"
          placeholder="Hours"
          required
        />
        <select name="taskPriority" required>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add AI Task</button>
      </form>

      <ul>
        {aiTasks.map((task, index) => (
          <li key={index}>
            <h3>{task.name}</h3>
            <p>Hours: {task.hours}</p>
            <p>Priority: {task.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AITasks;
