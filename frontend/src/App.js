import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TodaysAgenda from './TodaysAgenda';
import Deadlines from './Deadlines'; 
import './App.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskHours, setTaskHours] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDate, setTaskDate] = useState(''); // <-- New state for date
  const [taskTime, setTaskTime] = useState(''); // <-- New state for time
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskName && taskHours && taskDate && taskTime) {
      const selectedDateTime = new Date(`${taskDate}T${taskTime}`); // Combine date & time
      const newTask = { 
        name: taskName, 
        hours: taskHours, 
        priority: taskPriority,
        start: selectedDateTime // <-- Use this for the calendar event
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskHours('');
      setTaskPriority('Medium');
      setTaskDate('');
      setTaskTime('');
      setIsPopupOpen(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <h2>AI Planner</h2>
          <Link to="/" className="tab">My Calendar</Link>
          <Link to="/agenda" className="tab">Today's Agenda</Link>
          <Link to="/deadlines" className="tab">Deadlines</Link>
          <button className="add-task-btn" onClick={() => setIsPopupOpen(true)}>
            Add Task
          </button>
        </div>

        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={ 
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  events={tasks.map(task => ({
                    title: task.name,
                    start: task.start, // Use correct task time
                    description: `Priority: ${task.priority}`,
                  }))}
                />
              } 
            />
            <Route path="/agenda" element={<TodaysAgenda />} />
            <Route path="/deadlines" element={<Deadlines />} />
          </Routes>

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
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                />
                <input
                  type="time"
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                />
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
