import { Avatar, Button, Flex, Modal, Typography } from "antd";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { COLORS } from "../../helpers/colors";
import { formatPrice } from "../../helpers/formatPrice";

interface IProps {
  open: boolean;
  onClose: () => void;
  isSuccess: boolean;
  nominal: number;
  title: string;
}

export default function ResponseModalPaid(props: IProps) {
  return (
    <>
      <Modal
        open={props.open}
        onCancel={() => {
          props.onClose();
        }}
        closable={false}
        footer={false}
        width={426}
      >
        <Flex vertical align="center" gap={20}>
          {props.isSuccess ? (
            <Avatar
              style={{ backgroundColor: COLORS.green }}
              size={60}
              icon={
                <FaCheck
                  style={{
                    color: "#fff",
                  }}
                />
              }
            />
          ) : (
            <Avatar
              style={{ backgroundColor: COLORS.primary }}
              size={60}
              icon={
                <IoMdClose
                  style={{
                    color: "#fff",
                  }}
                />
              }
            />
          )}

          <Flex vertical gap={8}>
            <Typography.Text
              style={{
                textAlign: "center",
              }}
            >
              {props.title}
            </Typography.Text>
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                textAlign: "center",
              }}
            >
              {formatPrice(props.nominal)}
            </Typography.Title>
            <Typography.Text
              style={{
                textAlign: "center",
              }}
            >
              {props.isSuccess ? " Berhasil!" : "Gagal"}
            </Typography.Text>
          </Flex>
          <Flex
            vertical
            style={{
              width: "100%",
            }}
          >
            <Button
              type="text"
              block
              danger
              style={{
                fontWeight: "medium",
              }}
              onClick={() => {
                props.onClose();
              }}
            >
              Kembali ke beranda
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
