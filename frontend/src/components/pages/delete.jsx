import axios from "axios";

const DeleteTodo = ({ taskId, triggerUpdate }) => {
  const handleClickDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/tasks/${taskId}`);
      console.log("clear delete");
      triggerUpdate();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleClickDelete}
        className="border-zinc-800 border-2 m-2 p-2 rounded-2xl text-sm hover:bg-gray-200"
      >
        DELETE
      </button>
    </div>
  );
};

export default DeleteTodo;
