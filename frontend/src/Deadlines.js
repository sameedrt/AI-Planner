import React, { useState } from "react";
import { format, differenceInDays } from "date-fns";

const Deadlines = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Project Report", dueDate: "2025-02-20" },
    { id: 2, title: "Database Assignment", dueDate: "2025-02-25" },
    { id: 3, title: "AI Research", dueDate: "2025-03-10" },
  ]);

  const categorizeTask = (task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const daysLeft = differenceInDays(dueDate, today);

    if (daysLeft <= 3) return "Due Soon";
    if (daysLeft <= 14) return "Upcoming";
    return "Long-Term";
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
            <div key={task.id} className="deadline-card">
              <h3>{task.title}</h3>
              <p>Due: {format(new Date(task.dueDate), "yyyy-MM-dd")}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Deadlines;
