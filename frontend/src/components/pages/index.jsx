import { useState, useEffect } from "react";
import axios from "axios";

const Index = () => {
  const [tasks, setTasks] = useState([]);

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
  }, []);

  return (
    <div className="flex flex-col">
      <div className="text-center text-6xl pt-20">
        <h1>TODO</h1>
      </div>
      <div className="flex m-auto">
        <input
          className="w-60 border-zinc-800 border-2"
          type="text"
          placeholder="新しいTODO"
        />
        <button className="bg-blue-400 w-40 h-10">追加する</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <li>{task.title}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Index;
