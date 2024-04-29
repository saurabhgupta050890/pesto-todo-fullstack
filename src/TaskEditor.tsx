import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Task, taskRepo } from "./shared/task";
import { useEffect, useState } from "react";

interface ITaskEditorProps {
  task?: Task;
}

const TaskEditor = (props: ITaskEditorProps) => {
  const { task } = props;
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentTask, setCurrentTask] = useState(() => task ?? state);

  const handleTaskSave = () => {
    if (currentTask.title || currentTask.description) {
      taskRepo
        .save(currentTask)
        .then(() => {
          alert(`Task ${id ? "updated" : "created"} successfully`);
          navigate("/");
        })
        .catch(() => {
          alert(`Error ${id ? "updating" : "creating"} task`);
        });
    }
  };

  useEffect(() => {
    if (id && !state && !task) {
      taskRepo
        .find({
          where: {
            id: parseInt(id, 10),
          },
        })
        .then((t) => {
          setCurrentTask(t[0]);
        })
        .catch(() => {
          alert(`Error finding task id: ${id}`);
        });
    }
  }, [id]);

  return (
    <div className="w-full max-w-xs mx-auto mt-4">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Task Title ..."
            value={currentTask?.title}
            onChange={(e) => {
              setCurrentTask({ ...currentTask, title: e.target.value });
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={currentTask?.description}
            onChange={(e) => {
              setCurrentTask({ ...currentTask, description: e.target.value });
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleTaskSave}
          >
            Save
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default TaskEditor;
