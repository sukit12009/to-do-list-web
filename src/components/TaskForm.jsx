import React, { useState } from "react";
import { createTask } from "../services/api";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await createTask({ title, completed: false });
    setTitle("");
    onTaskAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6 p-4 rounded-lg border border-gray-700 bg-gray-800 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task..."
        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
}
