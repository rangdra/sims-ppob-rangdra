import { Flex } from "antd";
import AppLayout from "../../components/Layout/AppLayout";
import { useAppSelector } from "../../redux/store";
import Services from "./components/Services";
import Banner from "./components/Banner";

export default function Home() {
  const auth = useAppSelector((state) => state.auth);
  console.log("user::", auth);
  return (
    <AppLayout>
      <Flex vertical gap={52}>
        <Services />
        <Banner />
      </Flex>
    </AppLayout>
  );
}
