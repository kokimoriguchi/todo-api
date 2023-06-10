import axios from "axios";
import { useState } from "react";

const Update = ({ taskTitle, triggerUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState(taskTitle.title);

  const handleClickEdit = () => {
    setEdit(true);
  };

  const handleClickUpdate = async () => {
    setEdit(false);
    try {
      await axios.put(`http://localhost:3001/api/v1/tasks/${taskTitle.id}`, {
        task: { title: updateTask },
      });
      console.log("clear update");
      triggerUpdate();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="">
      {edit ? (
        <>
          <input
            type="text"
            value={updateTask}
            onChange={(e) => setUpdateTask(e.target.value)}
            className="border-zinc-800 border-2 m-2 p-2 rounded-2xl text-sm"
          />
          <button onClick={handleClickUpdate}>Save</button>
        </>
      ) : (
        <button
          onClick={handleClickEdit}
          className="border-zinc-800 border-2 m-2 p-2 rounded-2xl text-sm hover:bg-gray-200"
        >
          UPDATE
        </button>
      )}
    </div>
  );
};
export default Update;
