import { useState, useEffect } from "react";
import axios from "axios";
import CreateTask from "./create";

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
        <CreateTask />
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
