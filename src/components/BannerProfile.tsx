import { Button, Card, Col, Flex, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getBalance, reset } from "../redux/features/auth/authSlice";
import { COLORS } from "../helpers/colors";
import { formatPrice } from "../helpers/formatPrice";
import UserAvatar from "./UserAvatar";
import Dot from "./Dot";

export default function BannerProfile() {
  const [showBalance, setShowBalance] = useState(false);
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBalance(undefined));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <Row>
      <Col span={12}>
        <Space direction="vertical" size={16}>
          <UserAvatar url={user?.profile_image!} />
          <Space direction="vertical" size={0}>
            <Typography.Text
              style={{
                fontSize: 20,
              }}
            >
              Selamat datang,
            </Typography.Text>
            <Typography.Title level={1}>
              {user?.first_name} {user?.last_name ?? ""}
            </Typography.Title>
          </Space>
        </Space>
      </Col>
      <Col span={12}>
        <SaldoCard bordered={false} loading={isLoading}>
          <Space direction="vertical">
            <Typography.Text
              style={{
                fontSize: 18,
              }}
            >
              Saldo anda
            </Typography.Text>
            <div>
              {showBalance ? (
                <Typography.Title level={1}>
                  {formatPrice(user?.balance!)}
                </Typography.Title>
              ) : (
                <Flex align="center" gap={12}>
                  <Typography.Title level={1}>Rp</Typography.Title>
                  {/* <HiDotsHorizontal
                    style={{
                      fontSize: 60,
                    }}
                  /> */}
                  <Dot count={7} />
                </Flex>
              )}
            </div>
            <Flex gap="small" align="center">
              <Typography.Text>
                {showBalance ? "Tutup" : "Lihat"} saldo
              </Typography.Text>
              <Button
                type="text"
                className="reset-spacing-btn"
                onClick={() => setShowBalance((prev) => !prev)}
              >
                {showBalance ? <LuEyeOff /> : <MdOutlineRemoveRedEye />}
              </Button>
            </Flex>
          </Space>
        </SaldoCard>
      </Col>
    </Row>
  );
}

const SaldoCard = styled(Card)`
  background-color: ${COLORS.primary};
  * {
    color: #fff !important;
  }
`;
