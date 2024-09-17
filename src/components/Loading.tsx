import { Flex, Spin } from "antd";

export default function Loading() {
  return (
    <Flex
      justify="center"
      style={{
        width: "100%",
      }}
    >
      <Spin spinning />
    </Flex>
  );
}
