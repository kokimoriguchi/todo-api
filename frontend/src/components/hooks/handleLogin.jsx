import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const HandleLogin = ({ loginName, loginPassword }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false); // ログイン成功の状態を管理する新しいstate

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        if (
          loginName === response.data.name &&
          loginPassword === response.data.id
        ) {
          setIsLoginSuccess(true);
        } else {
          throw new Error("Invalid user data received");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    data();
  });

  // isLoginSuccessがtrueになったときに遷移
  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/index");
    }
  }, [isLoginSuccess, navigate]);

  return <div>{errorMessage && <p>Error: {errorMessage}</p>}</div>;
};
