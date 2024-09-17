import { Flex, Typography } from "antd";

interface IProps {
  size?: "small" | "middle" | "large";
}

export default function AppLogo(props: IProps) {
  return (
    <Flex align="center" gap="small">
      <img src="/assets/Logo.png" alt="logo" className="" />
      <Typography.Title
        level={3}
        style={{
          margin: 0,
          fontSize:
            props.size === "large" ? 24 : props.size === "middle" ? 20 : 16,
        }}
      >
        SIMS PPOB-Rangdra Pangestu
      </Typography.Title>
    </Flex>
  );
}
