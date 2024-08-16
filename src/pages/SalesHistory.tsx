import { Col, Row, Segmented, Table, TableColumnsType } from "antd";
import { useGetSalesHistoryQuery } from "../redux/features/sales/saleApi";
import { useState } from "react";
import Chart from "../components/Chart";

type DataType = {
  _id: string;
  key: string;
  productName: string;
  quantity: number;
  salePrice: number;
  buyerName: string;
  saleDate: string;
};

const SalesHistory = () => {
  const [period, setPeriod] = useState("daily");
  const { data: salesHistory } = useGetSalesHistoryQuery(period, {
    skip: !period,
  });

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const salesData = salesHistory?.data?.soldItemsSorted?.map(
    (sale: DataType) => ({
      key: sale._id,
      productName: sale.productName,
      salePrice: `$${sale.salePrice.toFixed(2)}`,
      saleQuantity: sale.quantity,
      buyerName: sale.buyerName,
      saleDate: formatDate(sale.saleDate),
    })
  );

  const onChange = async (period: string) => {
    setPeriod(period.toLowerCase());
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "saleQuantity",
    },
    {
      title: "Sale Value",
      dataIndex: "salePrice",
    },
    {
      title: "Buyer",
      dataIndex: "buyerName",
      responsive: ["sm"],
    },
    {
      title: "Sale Date",
      dataIndex: "saleDate",
      responsive: ["sm"],
    },
  ];

  return (
    <>
      <Segmented
        defaultValue="Daily"
        style={{ marginBottom: 24 }}
        onChange={(value) => onChange(value)}
        options={["Daily", "Weekly", "Monthly", "Yearly"]}
      />

      <Row gutter={16}>
        <Col span={24} md={{ span: 12 }}>
          <h2>Total Products Sold</h2>
          <h4 style={{ fontSize: "32px", fontWeight: "bold" }}>
            {salesHistory?.data.totalItemsSold
              ? salesHistory?.data.totalItemsSold
              : 0}
          </h4>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <h2>Total Sales Amount</h2>
          <h4 style={{ fontSize: "32px", fontWeight: "bold" }}>
            {salesHistory?.data.totalSaleValue
              ? `$${salesHistory?.data.totalSaleValue.toFixed(2)}`
              : `$0.00`}
          </h4>
        </Col>
      </Row>

      <Chart
        totalItemsSold={salesHistory?.data.totalItemsSold || 0}
        totalSaleValue={salesHistory?.data.totalSaleValue || 0}
      />

      <h4
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        Top 5 Sales
      </h4>
      <Table pagination={false} columns={columns} dataSource={salesData} />
    </>
  );
};

export default SalesHistory;
