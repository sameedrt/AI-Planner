//localStorage.js

const TASKS_KEY = "tasks";

// Get tasks from local storage
export const getTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

// Save tasks to local storage
export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// Add a new task
export const addTask = (task) => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
};

// Delete a task
export const deleteTask = (taskId) => {
  const tasks = getTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
};

// Update a task
export const updateTask = (updatedTask) => {
  const tasks = getTasks().map(task => 
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(tasks);
};
