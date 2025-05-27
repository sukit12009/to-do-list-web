import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-900 transition duration-300">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">📝 To-Do List</h1>
        </div>
        <TaskForm onTaskAdded={() => window.location.reload()} />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
