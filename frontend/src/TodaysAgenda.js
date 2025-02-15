// TodaysAgenda.js
import React, { useState, useEffect } from 'react';

function TodaysAgenda() {
  // Sample tasks for today
  const [tasks, setTasks] = useState([
    { id: 1, time: '9:00 AM', title: 'Math Lecture' },
    { id: 2, time: '11:00 AM', title: 'Team Meeting' },
    { id: 3, time: '1:00 PM', title: 'Gym Session' },
    { id: 4, time: '3:00 PM', title: 'Study Session' },
    { id: 5, time: '5:00 PM', title: 'Dinner with Friends' },
  ]);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="todays-agenda">
      <h2>Today's Agenda</h2>
      <div className="task-list">
        {tasks.map(task => {
          const isCurrentTask = currentTime === task.time;

          return (
            <div
              key={task.id}
              className={`task ${isCurrentTask ? 'current' : ''}`}
            >
              <span className="task-time">{task.time}</span>
              <span className="task-title">{task.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodaysAgenda;

