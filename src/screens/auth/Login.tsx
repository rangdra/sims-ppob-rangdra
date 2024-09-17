import { Button, Col, Flex, Form, Input, Row, Typography, message } from "antd";
import AuthLayout from "../../components/Layout/AuthLayout";
import { generateFormRules } from "../../helpers/formRules";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import Logo from "../../components/Layout/AppLogo";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../../helpers/colors";
import { login, reset } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";

interface IFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const {
    isError,
    isLoading,
    isSuccess,
    message: resMessage,
  } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form] = Form.useForm<IFormValues>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      message.error(resMessage);
    }

    if (isSuccess) {
      message.success(resMessage);
      dispatch(reset());
      navigate("/");
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess]);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
    } catch (error: any) {
      console.error(error);
      return;
    }

    const values = form.getFieldsValue();

    const data = {
      email: values.email,
      password: values.password,
    };

    dispatch(login(data));
  };

  return (
    <AuthLayout>
      <Flex vertical align="center" gap={32}>
        <Logo />
        <Typography.Title
          level={2}
          style={{
            textAlign: "center",
          }}
        >
          Masuk atau buat akun memulai
        </Typography.Title>
        <Form
          form={form}
          preserve={false}
          layout="vertical"
          name="registerForm"
          autoComplete="off"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="email"
                rules={generateFormRules("Email", ["required", "email"])}
              >
                <Input
                  placeholder="masukan email anda"
                  prefix={<MdAlternateEmail />}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="password"
                rules={generateFormRules("Password", ["required"])}
              >
                <Input.Password
                  placeholder="masukan password anda"
                  prefix={<MdLockOutline />}
                />
              </Form.Item>
            </Col>

            <Button
              block
              type="primary"
              onClick={handleSubmit}
              style={{
                marginTop: 24,
              }}
              loading={isLoading}
            >
              Masuk
            </Button>
          </Row>
        </Form>
        <Typography.Text type="secondary">
          belum punya akun? registrasi{" "}
          <Link
            to="/register"
            style={{
              fontWeight: "bold",
              color: COLORS.primary,
            }}
          >
            di sini
          </Link>
        </Typography.Text>
      </Flex>
    </AuthLayout>
  );
}
