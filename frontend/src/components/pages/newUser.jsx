import { useState } from "react";
import { HandleAddUser } from "../hooks/handleAddUser";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [passName, setPassName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const SendNewUser = () => {
    HandleAddUser(passName, password);
  };

  const backLoginPage = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <h1>CREATE USER</h1>
      <div>
        <input
          className="w-60 border-zinc-800 border-2"
          type="text"
          placeholder="name"
          onChange={(e) => setPassName(e.target.value)}
        />
      </div>
      <div>
        <input
          className="w-60 border-zinc-800 border-2"
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-60 border-zinc-800 border-2"
        onClick={() => {
          SendNewUser(passName, password);
        }}
      >
        send
      </button>
      <button className="w-60 border-zinc-800 border-2" onClick={backLoginPage}>
        back
      </button>
    </div>
  );
};

export default NewUser;
