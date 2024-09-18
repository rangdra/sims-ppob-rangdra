import { useEffect, useState } from "react";
import AppLayout from "../../components/Layout/AppLayout";
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { COLORS } from "../../helpers/colors";
import { formatPrice } from "../../helpers/formatPrice";
import styled from "styled-components";
import { MdOutlineMoney } from "react-icons/md";
import { generateFormRules } from "../../helpers/formRules";
import ModalTopup from "./components/ModalTopup";

export default function Topup() {
  const [form] = Form.useForm();
  const listNominal = [10000, 20000, 50000, 100000, 250000, 500000];
  const [showModalTopUp, setShowModalTopUp] = useState(false);

  const nominalWatch = Form.useWatch("nominal", form);

  const openModalTopup = async () => {
    try {
      await form.validateFields();
    } catch (error: any) {
      console.error(error);
      return;
    }

    setShowModalTopUp(true);
  };

  useEffect(() => {
    if (!nominalWatch) {
      form.setFields([
        {
          name: "nominal",
          value: undefined,
          errors: [],
        },
      ]);
    }
  }, [nominalWatch]);
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
          <Space direction="vertical" size={0}>
            <Typography.Text
              style={{
                fontSize: 20,
              }}
            >
              Silahkan masukan
            </Typography.Text>
            <Typography.Title level={1}>Nominal Top Up</Typography.Title>
          </Space>
          <Row gutter={[12, 12]}>
            <Col span={16}>
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
                      rules={generateFormRules("Nominal", [
                        "min-topup",
                        "max-topup",
                      ])}
                      name="nominal"
                    >
                      <InputNumberCustom
                        min={0}
                        prefix={
                          <MdOutlineMoney
                            style={{
                              color: "grey",
                            }}
                          />
                        }
                        placeholder="masukan nominal Top Up"
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
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Button
                      type="primary"
                      block
                      onClick={openModalTopup}
                      disabled={
                        !nominalWatch ||
                        (nominalWatch && nominalWatch < 10000) ||
                        (nominalWatch && nominalWatch > 1000000)
                      }
                    >
                      Top Up
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={8}>
              <Row gutter={[16, 16]}>
                {listNominal.map((v) => (
                  <Col span={8}>
                    <Button
                      block
                      onClick={() => form.setFieldValue("nominal", v)}
                    >
                      {formatPrice(v)}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Flex>
      </ConfigProvider>

      <ModalTopup
        open={showModalTopUp}
        onClose={() => setShowModalTopUp(false)}
        nominal={nominalWatch}
        onSuccess={() => form.resetFields()}
      />
    </AppLayout>
  );
}

export const InputNumberCustom = styled(InputNumber)`
  .ant-input-number-input {
    height: 48px !important;
  }
`;
