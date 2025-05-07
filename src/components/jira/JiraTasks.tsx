import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { Task, TaskStatus } from "../../interfaces";
import { SingleTask } from "./SingleTask";
import { useTaskStore } from "../../stores";
import classNames from "classnames";
import { useState } from "react";
import Swal from "sweetalert2";

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const [onDragOver, setOnDragOver] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);
  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Agregar tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Escribe el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Por favor ingresa un nombre para la tarea";
        }
      },
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn color-white bg-blue-500",
        cancelButton: "btn color-white bg-red-500",
      },
    });
    if (!isConfirmed) return;
    addTask(value, status);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setOnDragOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classNames(
        "!text-black relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-blue-500 border-dotted": isDragging,
          "border-green-500 border-dotted": isDragging && onDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
