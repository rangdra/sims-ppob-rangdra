import { useEffect, useState } from "react";
import AppLayout from "../../components/Layout/AppLayout";
import { Button, Card, Empty, Flex, Space, Typography, message } from "antd";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { httpRequest } from "../../helpers/api";
import { ITransaction } from "../../types/transaction.type";
import moment from "moment";
import styled from "styled-components";
import { formatPrice } from "../../helpers/formatPrice";
import { COLORS } from "../../helpers/colors";
import "moment/locale/id";
import Loading from "../../components/Loading";

const LIMIT = 5;
export default function Transaction() {
  moment.locale("id");

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit] = useState(LIMIT);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await httpRequest.get(
          `/transaction/history?offset=${offset}&limit=${limit}`
        );
        setTransactions(res.data.data.records);
      } catch (error) {
        message.error(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [limit, offset]);

  return (
    <AppLayout>
      <Space direction="vertical" size={20}>
        <Typography.Title level={4}>Semua Transaksi</Typography.Title>

        {isLoading ? (
          <Loading />
        ) : transactions.length > 0 ? (
          transactions.map((trx) => (
            <CustomCard key={trx.invoice_number}>
              <Flex justify="space-between">
                <Flex vertical>
                  <Typography.Title
                    style={{
                      marginBottom: 4,
                      color:
                        trx.transaction_type === "TOPUP"
                          ? COLORS.green
                          : COLORS.primary,
                    }}
                    level={4}
                  >
                    {trx.transaction_type === "TOPUP" ? "+" : "-"}{" "}
                    {formatPrice(trx.total_amount)}
                  </Typography.Title>
                  <Typography.Text
                    type="secondary"
                    style={{
                      fontSize: 12,
                      color: "#bcb9b9",
                    }}
                  >
                    {moment(trx.created_on).format("D MMMM YYYY HH:mm")} WIB
                  </Typography.Text>
                </Flex>
                <Typography.Text>{trx.description}</Typography.Text>
              </Flex>
            </CustomCard>
          ))
        ) : (
          <Empty />
        )}
        <Flex justify="center">
          <Button
            type="text"
            danger
            style={{
              fontWeight: 500,
            }}
            onClick={() => {
              if (transactions.length > 0) {
                setOffset((prev) => prev + LIMIT);
              } else {
                setOffset(0);
              }
            }}
            loading={isLoading}
          >
            {transactions.length > 0 ? "Show more" : "Kembali"}
          </Button>
        </Flex>
      </Space>
    </AppLayout>
  );
}

const CustomCard = styled(Card)`
  .ant-card-body {
    padding: 16px 28px;
  }
`;
