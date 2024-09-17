import { Col, Row } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactNode;
}
export default function AuthLayout(props: IProps) {
  return (
    <AuthLayoutContainer>
      <Col span={12}>
        <FormContainer>
          <div className="form">{props.children}</div>
        </FormContainer>
      </Col>
      <Col span={12}>
        <Illustration
          src="/assets/Illustrasi Login.png"
          alt="illustration login"
        />
      </Col>
    </AuthLayoutContainer>
  );
}

const AuthLayoutContainer = styled(Row)`
  height: 100vh;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .form {
    width: 60%;
  }
`;

const Illustration = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;
