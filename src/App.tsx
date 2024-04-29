import { useEffect, useState } from "react";
import { Task, taskRepo } from "./shared/task";
import TaskCard from "./components/TaskCard";
import { Link } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = taskRepo
      .liveQuery({
        where: {
          deleted: false,
        },
      })
      .subscribe((info) => setTasks(info.applyChanges));

    return () => {
      unsubscribe();
    };
  }, []);

  const handleTaskChange = async (newTask: Task) => {
    try {
      await taskRepo.save(newTask);
    } catch (e) {
      alert("Error updating task");
    }
  };

  return (
    <main className="p-2">
      <Link
        to="/task"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-2 cursor-pointer inline-block"
      >
        + Create Task
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              onTaskChange={handleTaskChange}
            />
          );
        })}
      </div>
    </main>
  );
}

export default App;
