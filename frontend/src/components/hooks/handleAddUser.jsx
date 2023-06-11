import axios from "axios";

export const HandleAddUser = async (passName, password) => {
  try {
    const response = await axios.post("http://localhost:3001/sign_in", {
      user: {
        name: passName,
        password: password,
      },
    });

    const token = response.data.user.token[0][1];

    console.log("API Response:", response.data);
    console.log("Token:", token);
    // トークンをリクエストヘッダーに設定する
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // APIエンドポイントにアクセスするリクエストを送信する
    //const apiResponse = await axios.get("http://localhost:3001/users");

    //console.log("API Response", apiResponse.data);
    console.log(token);
    alert(response.data.message);
  } catch (error) {
    console.log("error", error);
  }
};
