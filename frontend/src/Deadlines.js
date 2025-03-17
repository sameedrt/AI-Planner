import React, { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';

const Deadlines = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Filter tasks with a deadline (i.e., tasks that have a 'deadline' field)
    const deadlineTasks = savedTasks.filter(task => task.deadline);
    setTasks(deadlineTasks);
  }, []);

  // Function to categorize tasks based on due date
  const categorizeTask = (task) => {
    const today = new Date();
    const dueDate = new Date(task.deadline);  // Using 'deadline' here
    const daysLeft = differenceInDays(dueDate, today);

    if (daysLeft <= 3) return 'Due Soon';
    if (daysLeft <= 14) return 'Upcoming';
    return 'Long-Term';
  };

  const categorizedTasks = tasks.reduce((acc, task) => {
    const category = categorizeTask(task);
    if (!acc[category]) acc[category] = [];
    acc[category].push(task);
    return acc;
  }, {});

  return (
    <div className="deadlines-container">
      {Object.entries(categorizedTasks).map(([category, tasks]) => (
        <div key={category} className="deadlines-column">
          <h2>{category}</h2>
          {tasks.map(task => (
            <div key={task.name} className="deadline-card">
              <h3>{task.name}</h3>
              <p>Due: {format(new Date(task.deadline), 'yyyy-MM-dd')}</p>  {/* Display the formatted deadline */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Deadlines;

