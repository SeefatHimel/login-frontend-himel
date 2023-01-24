import axios from "axios";
import { toast } from "react-toastify";
const localHost = process.env.NODE_ENV === "development" ? true : false;
console.log(
  "🚀 ~ file: register.ts:4 ~ process.env.MODE",
  localHost,
  process.env.MODE
);

const apiEndpoint = localHost
  ? process.env.REACT_APP_API_URL_LOCAL
  : process.env.REACT_APP_API_URL;

console.log("🚀 ~ file: register.ts:5 ~ apiEndpoint", apiEndpoint);
export async function RegisterUser(data: any) {
  try {
    const response = await axios.post(apiEndpoint + "signUp", {
      data,
    });
    console.log(response);
    toast.success("User Added", {
      containerId: "top-right",
    });
    return true;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.message, {
      containerId: "top-right",
    });
    return false;
  }
}

export async function CheckEmailValidity(passedEmail: any) {
  try {
    await axios.post(apiEndpoint + "register_email", {
      headers: {},
      data: { email: passedEmail },
      Credential: true,
    });
    return true;
  } catch (error: any) {
    console.log("Email Error", error?.response?.data?.message);
    return false;
  }
}

export async function SignIn(values: any) {
  try {
    const { data } = await axios.post(apiEndpoint + "signIn", {
      email: values.email,
      password: values.password,
    });
    return data;
  } catch (error: any) {
    const { data } = error.response;

    toast.error(data?.message, {
      containerId: "top-right",
    });
  }
}
