import { Button, Col, Form, Input, Row, message } from "antd";
import { useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  logout,
  reset,
  updateProfile,
} from "../../../redux/features/auth/authSlice";
import { IUpdateUserRequest } from "../../../types/user.type";

export default function FormProfile({ isEdit }: { isEdit?: boolean }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isError,
    isLoading,
    isSuccess,
    message: resMessage,
    user,
  } = useAppSelector((state) => state.auth);

  const [form] = Form.useForm();
  const handleLogout = () => {
    dispatch(logout());
    message.success("Sukses Logout");
    dispatch(reset());
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user?.email,
        firstName: user?.first_name,
        lastName: user?.last_name,
      });
    }
  }, [user]);

  useEffect(() => {
    if (isEdit) {
      if (isError) {
        message.error(resMessage);
      }

      if (isSuccess) {
        message.success(resMessage);
        dispatch(reset());
        navigate(-1);
      }

      dispatch(reset());
    }
  }, [dispatch, isError, resMessage, isSuccess, isEdit]);

  const updateUser = async () => {
    try {
      await form.validateFields();
    } catch (error: any) {
      console.error(error);
      return;
    }

    const values = form.getFieldsValue();

    const data: IUpdateUserRequest = {
      first_name: values.firstName,
      last_name: values.lastName,
    };

    dispatch(updateProfile(data));
  };

  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row>
        <Col span={24}>
          <Form.Item name="email" label="Email">
            <Input
              placeholder="masukan email anda"
              prefix={<MdAlternateEmail />}
              readOnly={!isEdit}
              disabled={isEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="firstName" label="Nama Depan">
            <Input
              placeholder="nama depan"
              prefix={<FaRegUser />}
              readOnly={!isEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="lastName" label="Nama Belakang">
            <Input
              placeholder="nama belakang"
              prefix={<FaRegUser />}
              readOnly={!isEdit}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item>
            <Button
              block
              type="primary"
              onClick={() => {
                if (isEdit) {
                  updateUser();
                } else {
                  navigate("/akun/edit");
                }
              }}
              loading={isLoading}
            >
              {isEdit ? "Simpan" : "Edit Profile"}
            </Button>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item>
            <Button
              block
              danger
              onClick={() => {
                if (isEdit) {
                  navigate(-1);
                } else {
                  handleLogout();
                }
              }}
            >
              {isEdit ? "Batalkan" : "Logout"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
