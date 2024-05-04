import { useEffect, useState } from "react";
import { Task, TaskStatusType, taskRepo } from "./shared/task";
import TaskCard from "./components/TaskCard";
import { Link } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState("");

  const filteredTasks = currentFilter
    ? tasks.filter((task) => task.status.toString() === currentFilter)
    : tasks;

  const handleTaskChange = async (newTask: Task) => {
    try {
      await taskRepo.save(newTask);
    } catch (e) {
      alert("Error updating task");
    }
  };

  const handleTaskDelete = async (newTask: Task) => {
    try {
      await taskRepo.delete(newTask);
    } catch (e) {
      alert("Error updating task");
    }
  };

  useEffect(() => {
    const unsubscribe = taskRepo
      .liveQuery()
      .subscribe((info) => setTasks(info.applyChanges));

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main className="p-2">
      <div className="flex items-center mb-2">
        <Link
          to="/task"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer inline-block"
        >
          + Create Task
        </Link>

        <div className="ml-auto">
          <select
            id="Status"
            name="Status"
            onChange={(e) => {
              setCurrentFilter(e.target.value);
            }}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="">All</option>
            <option value={TaskStatusType.TO_DO}>To Do</option>
            <option value={TaskStatusType.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatusType.DONE}>Done</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredTasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              onTaskChange={handleTaskChange}
              onTaskDelete={handleTaskDelete}
            />
          );
        })}
      </div>
    </main>
  );
}

export default App;
