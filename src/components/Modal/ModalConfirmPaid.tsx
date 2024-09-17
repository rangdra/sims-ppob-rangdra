import { Button, Flex, Image, Modal, Typography } from "antd";

import { formatPrice } from "../../helpers/formatPrice";

interface IProps {
  open: boolean;
  onClose: () => void;
  nominal: number;
  onSuccess: () => void;
  title?: string;
  onOk: () => void;
  okText: string;
  loading: boolean;
}

export default function ModalConfirmPaid(props: IProps) {
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
            <Typography.Text>{props.title}</Typography.Text>
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
              onClick={() => {
                props.onOk();
              }}
              loading={props.loading}
            >
              {props.okText}
            </Button>

            <Button
              type="text"
              block
              onClick={() => props.onClose()}
              loading={props.loading}
            >
              Batalkan
            </Button>
          </Flex>
        </Flex>
      </Modal>

      {/* <ResponseModalPaid
        open={responseModal}
        onClose={() => {
          setResponseModal(false);
          props.onClose();
          props.onSuccess();
        }}
        nominal={props.nominal}
              isSuccess={isSuccessTopup}
              title=""
      /> */}
    </>
  );
}
