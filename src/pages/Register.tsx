import { Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";

const Register = () => {
  const [form] = Form.useForm();
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Creating Account");

    try {
      const res = await register(values).unwrap();

      toast.success(`${res?.message}`, { id: toastId });
      dispatch(logOut());
      form.resetFields();
      navigate("/login");

    } catch (err: any) {
      toast.error(`${err?.data.message}`, { duration: 2000, id: toastId });
    }
  };

  return (
    <Row style={{ height: "100vh" }}>
      <Col span={0} md={{ span: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            background: "#F1EDE3",
          }}
        >
          <img src="/heaven-gift-shop.png" />
        </div>
      </Col>
      <Col span={24} md={{ span: 12 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div>
            <Col span={24} md={{ span: 0 }} style={{ marginBottom: "30px" }}>
              <img
                style={{ borderRadius: "8px" }}
                src="/heaven-gift-shop-header.png"
                alt=""
              />
            </Col>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Register
            </p>
          </div>
          <Form
            form={form}
            layout="vertical"
            style={{ width: "70%" }}
            onFinish={onSubmit}
            autoComplete="off"
          >
            <Form.Item<string>
              label="Username"
              name="userName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<string>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<string>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button htmlType="submit">Register</Button>
          </Form>
          <div style={{ marginTop: "30px" }}>
            <p>
              Already have an account? <Link to={"/login"}>Login Now</Link>{" "}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
