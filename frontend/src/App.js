import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TodaysAgenda from './TodaysAgenda';
import Deadlines from './Deadlines';
import AITasks from './AITasks';
import './App.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskHours, setTaskHours] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [setDeadline, setSetDeadline] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [aiTasks, setAiTasks] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log("Loaded tasks from localStorage:", savedTasks); // Debugging
    setTasks(savedTasks);
  }, []);

  // Load AI tasks from localStorage on component mount
  useEffect(() => {
    const savedAITasks = JSON.parse(localStorage.getItem('aiTasks')) || [];
    console.log("Loaded AI tasks from localStorage:", savedAITasks); // Debugging
    setAiTasks(savedAITasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      console.log("Saving tasks to localStorage:", tasks); // Debugging
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Save AI tasks to localStorage whenever they change
  useEffect(() => {
    if (aiTasks.length > 0) {
      console.log("Saving AI tasks to localStorage:", aiTasks); // Debugging
      localStorage.setItem('aiTasks', JSON.stringify(aiTasks));
    }
  }, [aiTasks]);

  // Debugging AI task scheduling
  const handleAIScheduling = () => {
    console.log('AI Tasks:', aiTasks); // Debugging
    if (aiTasks.length === 0) {
      console.log("No AI tasks to schedule.");
      return;
    }
    const availableSlots = getAvailableSlots(tasks);
    console.log('Available Slots:', availableSlots); // Debugging
    const scheduledTasks = scheduleAITasks(aiTasks, availableSlots);

    console.log("Scheduled AI Tasks: ", scheduledTasks); // Debugging
  };

  const addTask = () => {
    if (taskName && taskHours) {
      const newTask = {
        name: taskName,
        hours: taskHours,
        priority: taskPriority,
      };

      if (setDeadline && taskDeadline) {
        newTask.deadline = taskDeadline;
      } else if (taskDate && taskTime) {
        const selectedDateTime = new Date(`${taskDate}T${taskTime}`);
        newTask.start = selectedDateTime.toISOString();
      }

      // Check for AI task and store it separately
      if (taskName.includes("AI")) {
        newTask.type = "AI";
        console.log("Adding AI task:", newTask); // Debugging
        setAiTasks(prev => {
          const updatedAiTasks = [...prev, newTask];
          console.log("Updated AI Tasks State:", updatedAiTasks); // Debugging
          return updatedAiTasks;
        }); // Add AI task to aiTasks state
      } else {
        console.log("Adding Regular Task:", newTask); // Debugging
        setTasks(prev => [...prev, newTask]); // Add regular task to tasks state
      }

      // Reset fields
      setTaskName('');
      setTaskHours('');
      setTaskPriority('Medium');
      setTaskDate('');
      setTaskTime('');
      setTaskDeadline('');
      setSetDeadline(false);
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
          <Link to="/ai-tasks" className="tab">AI Tasks</Link>
          <Link to="/deadlines" className="tab">Deadlines</Link>
          <button className="add-task-btn" onClick={() => setIsPopupOpen(true)}>
            Add Task
          </button>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<FullCalendar plugins={[dayGridPlugin]} events={tasks.filter(task => !task.deadline).map(task => ({ title: task.name, start: task.start, description: `Priority: ${task.priority}` }))} />} />
            <Route path="/ai-tasks" element={<AITasks aiTasks={aiTasks} />} />
            <Route path="/agenda" element={<TodaysAgenda />} />
            <Route path="/deadlines" element={<Deadlines />} />
          </Routes>

          {isPopupOpen && (
            <div className="popup">
              <div className="popup-content">
                <h3>Add New Task</h3>
                <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                <input type="number" placeholder="Hours" value={taskHours} onChange={(e) => setTaskHours(e.target.value)} />
                <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <div>
                  <label>
                    Set Deadline
                    <input type="checkbox" checked={setDeadline} onChange={() => setSetDeadline(prev => !prev)} />
                  </label>
                </div>
                {setDeadline ? (
                  <div>
                    <input type="date" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} />
                  </div>
                ) : (
                  <div>
                    <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
                    <input type="time" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />
                  </div>
                )}
                <button onClick={addTask}>Add Task</button>
                <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
              </div>
            </div>
          )}

          {/* AI Task Scheduling Button */}
          <div>
            <button onClick={handleAIScheduling}>Schedule AI Tasks</button>
          </div>
        </div>
      </div>
    </Router>
  );
}

const getAvailableSlots = (occupiedSlots) => {
  const availableSlots = [];
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(currentDay.getDate() + i);

    for (let hour = 0; hour < 24; hour++) {
      const slotStart = new Date(currentDay);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(currentDay);
      slotEnd.setHours(hour + 1, 0, 0, 0);

      const isAvailable = !occupiedSlots.some((slot) =>
        slotStart < slot.end && slotEnd > slot.start
      );

      if (isAvailable) {
        availableSlots.push({ start: slotStart, end: slotEnd });
      }
    }
  }

  return availableSlots;
};

const scheduleAITasks = (aiTasks, availableSlots) => {
  const scheduledTasks = [];

  aiTasks.forEach((task) => {
    const duration = task.hours;
    let assignedSlots = [];

    for (let i = 0; i < availableSlots.length; i++) {
      const slot = availableSlots[i];

      if (slot.end - slot.start >= duration * 60 * 60 * 1000) {
        assignedSlots.push(slot);
        break;
      }
    }
    

    if (assignedSlots.length > 0) {
      scheduledTasks.push({ ...task, assignedSlots });
    }
  });

  return scheduledTasks;
};

export default App;
