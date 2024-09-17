import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MenuProps } from "antd/lib";
import AppLogo from "./AppLogo";
import { AppWrapper } from "./AppWrapper";

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    label: "Top Up",
    key: "/top-up",
  },
  {
    label: "Transaction",
    key: "/transaction",
  },
  {
    label: "Akun",
    key: "/akun",
  },
];

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <CustomHeader>
      <Container>
        <Link to="/">
          <AppLogo size="small" />
        </Link>
        <Menu
          items={items}
          theme="light"
          mode="horizontal"
          style={{
            width: "30%",
            borderBottom: "1px solid #d1d5db",
          }}
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
        />
      </Container>
    </CustomHeader>
  );
}

const CustomHeader = styled(Header)`
  padding: 0px;
  margin: 0px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #d1d5db !important;
`;

const Container = styled(AppWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
