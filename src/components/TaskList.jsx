import React, { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../services/api";
import { FaTrash, FaCheck, FaSpinner } from "react-icons/fa";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (task) => {
    await updateTask(task.id, { ...task, completed: !task.completed });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <FaSpinner className="animate-spin text-blue-500 text-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded bg-red-900/30 text-red-200">
        {error}
        <button
          onClick={fetchTasks}
          className="ml-2 px-3 py-1 rounded text-sm font-medium bg-red-800/50 hover:bg-red-700/50 text-red-100"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-center py-6 rounded bg-gray-800/50 text-gray-400">
          No tasks yet. Add one above!
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                task.completed
                  ? "bg-green-900/30 border border-green-800/50"
                  : "bg-gray-800 border border-gray-700 hover:shadow-lg hover:border-gray-600"
              }`}
            >
              <span
                className={`flex-1 ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-200"
                }`}
              >
                {task.title}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleToggle(task)}
                  className={`p-2 rounded-full transition-colors ${
                    task.completed
                      ? "text-green-400 hover:bg-green-800/50"
                      : "text-gray-500 hover:bg-gray-700 hover:text-green-400"
                  }`}
                  aria-label={
                    task.completed ? "Mark as incomplete" : "Mark as complete"
                  }
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-2 rounded-full text-red-500 hover:bg-red-900/30 hover:text-red-400 transition-colors"
                  aria-label="Delete task"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
