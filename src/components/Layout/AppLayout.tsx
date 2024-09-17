import { Flex, Layout } from "antd";
import { ReactNode, useEffect } from "react";
import AppHeader from "./AppHeader";
import { AppWrapper } from "./AppWrapper";
import BannerProfile from "../BannerProfile";
import { useAppDispatch } from "../../redux/store";
import { reset } from "../../redux/features/auth/authSlice";
import { reset as resetInf } from "../../redux/features/information/informationSlice";

const { Content } = Layout;

export default function AppLayout({
  children,
  hideBannerProfile,
}: {
  children: ReactNode;
  hideBannerProfile?: boolean;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetInf());
    };
  }, [dispatch]);

  return (
    <Layout>
      <AppHeader />
      <Content style={{ background: "#fff", padding: "50px 0px" }}>
        <AppWrapper>
          <Flex vertical gap={52}>
            {!hideBannerProfile && <BannerProfile />}
            {children}
          </Flex>
        </AppWrapper>
      </Content>
    </Layout>
  );
}
