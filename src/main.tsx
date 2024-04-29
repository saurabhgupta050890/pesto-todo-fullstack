import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TaskEditor from "./TaskEditor.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task/:id?",
    element: <TaskEditor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <header className="px-4 py-2 flex bg-indigo-500 items-center justify-center">
        <h1 className="text-lg text-white ">Task Manager</h1>
      </header>
      <RouterProvider router={router} />
    </>
  </React.StrictMode>
);
