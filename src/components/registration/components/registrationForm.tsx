import React from "react";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CheckEmailValidity, RegisterUser } from "../../../APIs/register";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [emailStatus, setEmailStatus] = useState<
    "" | "success" | "warning" | "error" | "validating" | undefined
  >("");
  const onFinish = async (values: any) => {
    const validEmail = await CheckEmailValidity(values.email);
    console.log(
      "🚀 ~ file: registrationForm.tsx:16 ~ onFinish ~ validEmail",
      validEmail
    );

    if (validEmail) setEmailStatus("success");
    else setEmailStatus("error");
    if (validEmail) {
      const temp = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      };
      // console.log("Success:", values);
      const userRegistered = await RegisterUser(temp);
      if (userRegistered) navigate("/login");
    } else {
      toast.error("email already Used", {
        containerId: "top-right",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    errorInfo &&
      errorInfo.errorFields.forEach((ef: any) => {
        toast.error(ef.errors[0], {
          containerId: "top-right",
        });
      });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onValuesChange={(e) => setEmailStatus("validating")}
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
                v = await CheckEmailValidity(value);
                if (v) {
                  setEmailStatus("success");
                  return Promise.resolve();
                }
                if (!v) {
                  setEmailStatus("error");
                  return Promise.reject(new Error("Email already in use!"));
                }
              }
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
