import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TodaysAgenda from './TodaysAgenda';
import './App.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskHours, setTaskHours] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskTime, setTaskTime] = useState('None'); // Added state for task time
  const [tasks, setTasks] = useState([]);

  // Add task function
  const addTask = () => {
    if (taskName && taskHours) {
      const newTask = { 
        name: taskName, 
        hours: taskHours, 
        priority: taskPriority,
        time: taskTime // Add the time slot information
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskHours('');
      setTaskPriority('Medium');
      setTaskTime('None'); // Reset time to "None"
      setIsPopupOpen(false); // Close the popup
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Sidebar with links */}
        <div className="sidebar">
          <h2>AI Planner</h2>
          <Link to="/" className="tab">My Calendar</Link>
          <Link to="/agenda" className="tab">Today's Agenda</Link>

          {/* Add Task Button */}
          <button className="add-task-btn" onClick={() => setIsPopupOpen(true)}>
            Add Task
          </button>
        </div>
        
        {/* Main content area */}
        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  events={tasks.map(task => ({
                    title: task.name,
                    start: new Date(),  // For now, setting the task to today's date (adjust if needed)
                    description: `Priority: ${task.priority}, Time: ${task.time}`,
                  }))}
                />
              } 
            />  {/* Calendar page */}
            <Route path="/agenda" element={<TodaysAgenda />} />  {/* Today's Agenda page */}
          </Routes>

          {/* Popup for adding tasks */}
          {isPopupOpen && (
            <div className="popup">
              <div className="popup-content">
                <h3>Add New Task</h3>
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
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <select
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                >
                  <option value="None">None (AI to Handle)</option>
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
                  <option value="Evening (5 PM - 9 PM)">Evening (5 PM - 9 PM)</option>
                </select>
                <button onClick={addTask}>Add Task</button>
                <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
