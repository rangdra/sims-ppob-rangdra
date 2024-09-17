import { Button, Col, Flex, Form, Input, Row, Typography, message } from "antd";
import AuthLayout from "../../components/Layout/AuthLayout";
import { generateFormRules } from "../../helpers/formRules";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Logo from "../../components/Layout/AppLogo";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../../helpers/colors";
import { register, reset } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";

interface IFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
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
      navigate("/login");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
    } catch (error: any) {
      console.error(error);
      return;
    }

    const values = form.getFieldsValue();
    if (values.password !== values.confirmPassword) {
      message.error("Password tidak sama.");
      return;
    }

    const data = {
      email: values.email,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
    };

    dispatch(register(data));
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
          Lengkapi data untuk membuat akun
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
                name="firstName"
                rules={generateFormRules("Nama Depan", ["required"])}
              >
                <Input placeholder="nama depan" prefix={<FaRegUser />} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="lastName"
                rules={generateFormRules("Nama Belakang", ["required"])}
              >
                <Input placeholder="nama belakang" prefix={<FaRegUser />} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="password"
                rules={generateFormRules("Password", [
                  "required",
                  "min-8-characters",
                ])}
              >
                <Input.Password
                  placeholder="buat password"
                  prefix={<MdLockOutline />}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="confirmPassword"
                rules={generateFormRules("Konfirmasi Password", ["required"])}
              >
                <Input.Password
                  placeholder="konfirmasi password"
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
              Registrasi
            </Button>
          </Row>
        </Form>
        <Typography.Text type="secondary">
          sudah punya akun? login{" "}
          <Link
            to="/login"
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
