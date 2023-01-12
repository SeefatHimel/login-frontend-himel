import Card from "antd/es/card/Card";
import GoogleButton from "react-google-button";
import { getAuthLink } from "../../APIs";
import LoginForm from "./components/loginForm";
// import { useNavigate } from "react-router-dom";
// import { PopupWindow } from "./components/PopupWindow";

const Login = () => {
  // const navigate = useNavigate();
  // const someFunction = async (resp: any) => {
  //   // alert("ok");
  //   console.log("XXXXXXXXXX");
  //   navigate("/");

  //   console.log(resp);
  // };
  const getLink = async () => {
    const res = await getAuthLink();
    console.log("$$$$$$$$$$$$$$", res?.data);
    window.open(res?.data, "_self");
    // PopupWindow(res?.data, "google", someFunction);
    // window.location.replace(res?.data);
    window.location.href = res?.data;
    // navigate(`${res?.data}`);
  };
  return (
    <div>
      <div className="text-xl text-blue-500 p-6">First we have to log in</div>
      <div className="w-2/3 mx-auto">
        <Card title="Credentials" bordered={false}>
          <LoginForm />
        </Card>
        <div className="p-6">
          <div className="text-blue-600 p-2">Log in with Google</div>
          <GoogleButton onClick={() => getLink()} />
        </div>
      </div>
    </div>
  );
};
export default Login;
