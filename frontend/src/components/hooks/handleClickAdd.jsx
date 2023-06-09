import axios from "axios";

export const HandleClickAdd = async (newTask) => {
  try {
    await axios.post("http://localhost:3001/api/v1/tasks", {
      task: { title: newTask },
    });
    console.log("clear add");
  } catch (error) {
    console.log("error", error);
  }
};
