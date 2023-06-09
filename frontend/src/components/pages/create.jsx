import { useState } from "react";
import { HandleClickAdd } from "../hooks/handleClickAdd";

const CreateTask = () => {
  const [newTask, setNewTask] = useState("");

  //非同期関数はクリックイベントで直接参照できないので、関数で包み隠して呼び出す。
  const handleClickAddWrapper = () => {
    HandleClickAdd(newTask);
  };

  return (
    <>
      <input
        className="w-60 border-zinc-800 border-2"
        type="text"
        placeholder="NEW TODO"
        value={newTask} // 入力フィールドの値をnewTaskにバインド
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className="bg-blue-400 w-40 h-10 hover:bg-blue-500 border-zinc-800 border-2"
        onClick={() => {
          handleClickAddWrapper(newTask);
          setNewTask(""); //newTaskを関数に渡した後に空にする。入力フィールドバインドしているから消える。
        }}
      >
        ADD
      </button>
    </>
  );
};

export default CreateTask;
