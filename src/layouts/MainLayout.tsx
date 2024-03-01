import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { Button, Layout } from "antd";
import { logOut } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import SidebarLayout from "./SidebarLayout";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
    toast.success("Logged Out");
  };
  return (
    <Layout style={{ height: "100%" }}>
      <SidebarLayout></SidebarLayout>
      <Layout>
        <Header
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            backgroundColor: "#F1EDE3",
          }}
        >
          <Button
            style={{
              backgroundColor: "white",
              textAlign: "end",
              marginRight: "30px",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Heaven Gift Shop ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
