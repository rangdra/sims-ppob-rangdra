import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getServices,
  reset,
} from "../../redux/features/information/informationSlice";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../../components/Layout/AppLayout";
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { COLORS } from "../../helpers/colors";
import { InputNumberCustom } from "../topup";
import { MdOutlineMoney } from "react-icons/md";
import ModalConfirmPaid from "../../components/Modal/ModalConfirmPaid";
import { httpRequest } from "../../helpers/api";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import ResponseModalPaid from "../../components/Modal/ResponseModal";

export default function Paid() {
  const params = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { services } = useAppSelector((state) => state.information);
  const dispatch = useAppDispatch();
  const [showModalConfirmPaid, setShowModalConfirmPaid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModalResponsePaid, setShowModalResponsePaid] = useState(false);

  useEffect(() => {
    dispatch(getServices(undefined));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, params?.code]);

  const service = () =>
    services.find((s) => s.service_code.toLowerCase() === params.code);

  useEffect(() => {
    if (service()?.service_tariff) {
      form.setFieldValue("nominal", service()?.service_tariff);
    }
  }, [service]);

  const handlePaid = async () => {
    setIsLoading(true);
    try {
      const res = await httpRequest.post("/transaction", {
        service_code: service()?.service_code,
      });
      console.log("res::", res);
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      message.error(getErrorMessage(error));
    } finally {
      setShowModalResponsePaid(true);
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <ConfigProvider
        button={{
          style: {
            height: 48,
          },
        }}
        theme={{
          token: {
            colorPrimary: COLORS.primary,
            colorPrimaryText: COLORS.primary,
          },
        }}
      >
        <Flex vertical gap={40}>
          <Space direction="vertical" size={8}>
            <Typography.Text
              style={{
                fontSize: 16,
              }}
            >
              PemBayaran
            </Typography.Text>
            <Flex align="center" gap="small">
              <Avatar src={service()?.service_icon} size={32} shape="square" />
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                }}
              >
                {service()?.service_name}
              </Typography.Title>
            </Flex>
          </Space>
          <Form
            form={form}
            preserve={false}
            layout="vertical"
            name="registerForm"
            autoComplete="off"
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                  name="nominal"
                >
                  <InputNumberCustom
                    prefix={
                      <MdOutlineMoney
                        style={{
                          color: "grey",
                        }}
                      />
                    }
                    // placeholder="masukan nominal Top Up"
                    style={{
                      width: "100%",
                    }}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    }
                    parser={(value) =>
                      value?.replace(/\.\s?|(,*)/g, "") as unknown as number
                    }
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  block
                  onClick={() => setShowModalConfirmPaid(true)}
                  // disabled={
                  //   !nominalWatch ||
                  //   (nominalWatch && nominalWatch < 10000) ||
                  //   (nominalWatch && nominalWatch > 1000000)
                  // }
                >
                  Bayar
                </Button>
              </Col>
            </Row>
          </Form>
        </Flex>
      </ConfigProvider>

      <ModalConfirmPaid
        open={showModalConfirmPaid}
        onClose={() => setShowModalConfirmPaid(false)}
        nominal={service()?.service_tariff!}
        title={`Beli ${service()?.service_name} senilai`}
        onOk={() => {
          handlePaid();
        }}
        okText="Ya, lanjutkan Bayar"
        loading={isLoading}
        onSuccess={() => {
          navigate("/");
        }}
      />

      <ResponseModalPaid
        title={`Pembayaran ${service()?.service_name} sebesar`}
        nominal={service()?.service_tariff!}
        isSuccess={isSuccess}
        onClose={() => navigate("/")}
        open={showModalResponsePaid}
      />
    </AppLayout>
  );
}
