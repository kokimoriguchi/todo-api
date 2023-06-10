import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateTask from "./create";
import DeleteTodo from "./delete";
import Update from "./update";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/tasks");
        setTasks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [updateTrigger]);

  const handleClickBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <div className="text-center text-6xl pt-20">
        <h1>TODO</h1>
      </div>
      <div className="flex m-auto">
        <CreateTask triggerUpdate={() => setUpdateTrigger(!updateTrigger)} />
      </div>
      <ul className="w-2/3 m-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-center border-zinc-800 border-2"
          >
            <li className="m-2 p-2">{task.title}</li>
            <Update
              taskTitle={task}
              triggerUpdate={() => setUpdateTrigger(!updateTrigger)}
            />
            <DeleteTodo
              taskId={task.id}
              triggerUpdate={() => setUpdateTrigger(!updateTrigger)} //trigger関数としてuseState関数を反転するものを渡している。
            />
          </div>
        ))}
      </ul>
      <button onClick={handleClickBack}>back</button>
    </div>
  );
};

export default Index;
