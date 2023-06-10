import axios from "axios";

//引数としてtriggerUpdateを受け取り、その引数の関数を実行している。
export const HandleClickAdd = async (newTask, triggerUpdate) => {
  try {
    await axios.post("http://localhost:3001/api/v1/tasks", {
      task: { title: newTask },
    });
    console.log("clear add");
    triggerUpdate();
  } catch (error) {
    console.log("error", error);
  }
};
