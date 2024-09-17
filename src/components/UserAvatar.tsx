import { Avatar } from "antd";

export default function UserAvatar({
  url,
  size,
}: {
  url: string;
  size?: number;
}) {
  let isExist = url.split("/")[url.split("/").length - 1] !== "null";
  return (
    <Avatar
      size={size || 80}
      src={
        <img src={isExist ? url : "/assets/Profile Photo.png"} alt="avatar" />
      }
    />
  );
}
