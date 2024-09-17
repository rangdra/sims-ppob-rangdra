import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button, Flex, Typography, Upload, message } from "antd";
import AppLayout from "../../components/Layout/AppLayout";
import FormProfile from "./components/FormProfile";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { UploadProps } from "antd/lib";
import UserAvatar from "../../components/UserAvatar";
import { setUser } from "../../redux/features/auth/authSlice";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { uploadProfile } from "../../redux/features/auth/authService";
import { isImageMoreThanXKB } from "../../helpers/image";

export default function Profile({ isEdit }: { isEdit?: boolean }) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const props: UploadProps = {
    name: "file",
    async onChange(info) {
      const file = info.file;
      if (file.type === "image/png" || file.type === "image/jpeg") {
        console.log("file::", file);
        const isLimitSize = isImageMoreThanXKB(info.file, 100);
        if (isLimitSize) {
          message.error(`File must smaller than ${100}Kb!`);
          return;
        }

        try {
          const res = await uploadProfile(info.file);

          message.success(res.message);
          dispatch(setUser(res.data));
        } catch (error) {
          message.error(getErrorMessage(error));
        }
      } else {
        message.error("Image harus png atau jpeg.");
        return;
      }
    },
    beforeUpload: () => false,
    multiple: false,
    showUploadList: false,
    maxCount: 1,
    accept: "image/png, image/jpeg",
  };

  return (
    <AppLayout hideBannerProfile>
      <Flex
        vertical
        gap={16}
        align="center"
        style={{
          width: "50%",
          margin: "0 auto",
        }}
      >
        <Upload {...props}>
          <ContainerAvatar>
            <UserAvatar url={user?.profile_image!} size={120} />
            <Button className="btn-upload" shape="circle">
              <MdEdit
                style={{
                  fontSize: 12,
                }}
              />
            </Button>
          </ContainerAvatar>
        </Upload>

        <Typography.Title level={2}>
          {user?.first_name} {user?.last_name ?? ""}
        </Typography.Title>

        <FormProfile isEdit={isEdit} />
      </Flex>
    </AppLayout>
  );
}

const ContainerAvatar = styled.div`
  position: relative;

  .btn-upload {
    position: absolute;
    bottom: 0;
    right: 0px;
    width: 32px !important;
    height: 32px !important;
  }
`;
