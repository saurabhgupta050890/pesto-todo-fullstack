import { useNavigate } from "react-router-dom";
import { TASK_STATUS_LABEL } from "../constant";
import { Task, TaskStatusType } from "../shared/task";

interface ITaskProps {
  task: Task;
  onTaskChange?: (task: Task) => void;
  onTaskDelete?: (task: Task) => void;
}

const TaskCard = ({ task, onTaskChange, onTaskDelete }: ITaskProps) => {
  const { title, description, status } = task;
  const changeTaskStatus = (status: TaskStatusType) => {
    const updatedTask = {
      ...task,
      status: status,
    };

    onTaskChange && onTaskChange(updatedTask);
  };

  const navigate = useNavigate();

  return (
    <div className="rounded overflow-hidden shadow-lg border border-gray-100">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 flex">
          {title}
          <button
            className="bg-transparent hover:bg-indigo-500 text-indigo-700 hover:text-white py-1 px-2 border border-indigo-500 hover:border-transparent rounded text-sm ml-auto"
            onClick={() => {
              navigate(`/task/${task.id}`, { state: task });
            }}
          >
            Edit
          </button>
          <button
            className="bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded text-sm ml-1"
            onClick={() => onTaskDelete && onTaskDelete(task)}
          >
            Delete
          </button>
        </div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {TASK_STATUS_LABEL[status]}
        </span>

        <div className="ml-auto">
          {status != TaskStatusType.TO_DO ? (
            <button
              className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => changeTaskStatus(TaskStatusType.TO_DO)}
            >
              Move to TODO
            </button>
          ) : null}

          {status != TaskStatusType.IN_PROGRESS ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
              onClick={() => changeTaskStatus(TaskStatusType.IN_PROGRESS)}
            >
              Move to In Progress
            </button>
          ) : null}

          {status != TaskStatusType.DONE ? (
            <button
              className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-1 px-2 rounded ml-2"
              onClick={() => changeTaskStatus(TaskStatusType.DONE)}
            >
              Mark as Done
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
