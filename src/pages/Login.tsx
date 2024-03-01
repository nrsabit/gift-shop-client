import { Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [form] = Form.useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("logging in", { duration: 2000 });

    try {
      const res = await login(values).unwrap();
      const user = verifyToken(res.data.token);
      toast.success(`${res?.message}`, { id: toastId });
      dispatch(setUser({ user, token: res.data.token }));
      form.resetFields();
      navigate("/manage-products");
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
          <img src="/public/heaven-gift-shop.png" />
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
              Login
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

            <Button htmlType="submit">Login</Button>
          </Form>
          <div style={{ marginTop: "30px" }}>
            <p>
              New on GiftShop? Please <Link to={"/register"}>Register Now</Link>{" "}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
