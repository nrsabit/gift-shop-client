import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { currentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const SidebarLayout = () => {
  const token = useAppSelector(currentToken);

  let user;
  if (token) {
    user = verifyToken(token) as Record<string, any>;
  }

  const sidebarItems = [
    {
      key: "Manage Products",
      label: <NavLink to={"/manage-products"}>Manage Products</NavLink>,
    },
    {
      key: "Sales History",
      label: <NavLink to={"/sales-history"}>Sales History</NavLink>,
    },
  ];

  if (user?.role === "manager") {
    sidebarItems.splice(1, 0, {
      key: "Add Product",
      label: <NavLink to={"/add-product"}>Add Product</NavLink>,
    });
  }

  return (
    <Sider
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        backgroundColor: "#F1EDE3",
      }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div
        className="demo-logo-vertical"
        style={{
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ marginTop: "20px" }}
          src="/heaven-gift-shop-header.png"
          alt=""
        />
      </div>
      <Menu
        style={{ backgroundColor: "#F1EDE3", marginTop: "20px" }}
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems as ItemType<MenuItemType>[]}
      />
    </Sider>
  );
};

export default SidebarLayout;
