import React from "react";
import { Button, Form, Input } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [emailStatus, setEmailStatus] = useState<
    "" | "success" | "warning" | "error" | "validating" | undefined
  >("");
  const onFinish = async (values: any) => {
    const validEmail = await checkEmailValidity(values.email);
    if (validEmail) {
      const temp = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      };
      // console.log("Success:", values);
      try {
        const response = await axios.post("http://localhost:3000/signUp", {
          data: temp,
        });
        console.log(response);
        toast.success("User Added", {
          containerId: "top-right",
        });
        navigate("/login");
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message, {
          containerId: "top-right",
        });
      }
    } else {
      toast.error("email already Used", {
        containerId: "top-right",
      });
    }
  };

  const onChange = (values: any) => {
    // if (values?.target?.value.length > 5) setEmailStatus("success");
    // else
    // console.log(values);

    if (values.email !== email) {
      setEmail(values.email);
      setEmailStatus("validating");
    }
    // console.log(values?.target?.value, values?.target?.value.length, status);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    errorInfo &&
      errorInfo.errorFields.map((ef: any) => {
        toast.error(ef.errors[0], {
          containerId: "top-right",
        });
      });
  };
  const checkEmailValidity = async (passedEmail: any) => {
    console.log(email);
    try {
      // const response =
      await axios.post("http://localhost:3000/register_email", {
        headers: {},
        data: { email: `${email ? email : passedEmail}` },
        Credential: true,
      });
      setEmailStatus("success");
      return true;
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      setEmailStatus("error");
      return false;
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onValuesChange={(e) => onChange(e)}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your First Name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your Last Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        validateFirst={true}
        validateStatus={emailStatus}
        hasFeedback
        rules={[
          { required: true, message: "Please input a valid email!" },
          {
            type: "email",
            whitespace: false,
            min: 0,
            max: 200,
            message: `Please input a valid email.`,
          },
          ({ getFieldValue }) => ({
            async validator(_, value) {
              let v;
              if (emailStatus === "validating" && value?.length >= 5) {
                v = await checkEmailValidity(value);
              }
              if (v) {
                return Promise.resolve();
              }
              if (!v) return Promise.reject(new Error("Email already in use!"));
            },
          }),
        ]}
        // help="Something breaks the rule."
      >
        <Input
          placeholder="I'm the content is being validated"
          type="email"
          id="validating"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Re-type Password"
        name="passwordRe"
        rules={[
          { required: true, message: "Please re-input your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords does not match!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="bg-red-500">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
