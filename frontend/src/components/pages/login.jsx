import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/index");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <h1>LOGIN</h1>
      <div>
        <input
          className="w-60 border-zinc-800 border-2"
          type="text"
          placeholder="email"
        />
      </div>
      <div>
        <input
          className="w-60 border-zinc-800 border-2"
          type="text"
          placeholder="password"
        />
      </div>
      <button className="w-60 border-zinc-800 border-2" onClick={handleLogin}>
        send
      </button>
    </div>
  );
};

export default Login;
