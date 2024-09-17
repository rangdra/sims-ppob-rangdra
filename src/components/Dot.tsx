import { Flex } from "antd";
import styled from "styled-components";

export default function Dot({ count }: { count: number }) {
  return (
    <Flex align="center" gap="small">
      {[...Array(count)].map(() => (
        <DotComponent />
      ))}
    </Flex>
  );
}

const DotComponent = styled.div`
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
`;
