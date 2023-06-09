import { useState } from "react";
import axios from "axios";

const CreateTask = () => {
  const [newTask, setNewTask] = useState("");

  const handleClickAdd = async () => {
    try {
      await axios.post("http://localhost:3001/api/v1/tasks", {
        task: { title: newTask },
      });
      console.log("clear add");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <input
        className="w-60 border-zinc-800 border-2"
        type="text"
        placeholder="新しいTODO"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="bg-blue-400 w-40 h-10" onClick={handleClickAdd}>
        追加する
      </button>
    </>
  );
};

export default CreateTask;
