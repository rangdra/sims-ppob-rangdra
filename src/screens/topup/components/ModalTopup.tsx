import { Button, Flex, Image, Modal, Typography, message } from "antd";
import { useState } from "react";
import { formatPrice } from "../../../helpers/formatPrice";
import ResponseModalTopup from "./ResponseModal";
import { getErrorMessage } from "../../../helpers/getErrorMessage";
import { httpRequest } from "../../../helpers/api";
import { useAppDispatch } from "../../../redux/store";
import { getBalance } from "../../../redux/features/auth/authSlice";

interface IProps {
  open: boolean;
  onClose: () => void;
  nominal: number;
  onSuccess: () => void;
}

export default function ModalTopup(props: IProps) {
  const [responseModal, setResponseModal] = useState(false);
  const [isSuccessTopup, setIsSuccessTopup] = useState(false);
  const dispatch = useAppDispatch();
  const [loading, setIsloading] = useState(false);

  const handleTopup = async () => {
    setIsloading(true);
    try {
      await httpRequest.post("/topup", {
        top_up_amount: props.nominal,
      });
      setIsSuccessTopup(true);

      dispatch(getBalance(undefined));
    } catch (error) {
      setIsSuccessTopup(false);
      message.error(getErrorMessage(error));
    } finally {
      setResponseModal(true);
      setIsloading(false);
    }
  };
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
        <Flex vertical align="center" gap={24}>
          <Image
            src="/assets/Logo.png"
            width={60}
            height={60}
            preview={false}
          />
          <Flex vertical>
            <Typography.Text>Anda yakin untuk Top Up sebesar</Typography.Text>
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                textAlign: "center",
              }}
            >
              {formatPrice(props.nominal)} ?
            </Typography.Title>
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
              onClick={handleTopup}
              loading={loading}
            >
              Ya, lanjutkan Top Up
            </Button>

            <Button
              type="text"
              block
              onClick={() => props.onClose()}
              loading={loading}
            >
              Batalkan
            </Button>
          </Flex>
        </Flex>
      </Modal>

      <ResponseModalTopup
        open={responseModal}
        onClose={() => {
          setResponseModal(false);
          props.onClose();
          props.onSuccess();
        }}
        nominal={props.nominal}
        isSuccess={isSuccessTopup}
      />
    </>
  );
}
