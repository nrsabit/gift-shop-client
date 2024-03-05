import { Col, Flex, Table, TableColumnsType } from "antd";
import React from "react";

export type TInvoiceRef = {
  ref: any;
};

type TInvoiceProps = {
  sale: {
    key: string;
    buyerName: string;
    salePrice: string;
    productName: string;
    saleQuantity: number;
    saleDate: string;
  };
};

const Invoice = React.forwardRef<TInvoiceRef, TInvoiceProps>(
  ({ sale }, ref) => {
    const columns: TableColumnsType<any> = [
      {
        title: "Product Name",
        dataIndex: "productName",
      },
      {
        title: "Quantity Sold",
        dataIndex: "saleQuantity",
      },
      {
        title: "Sale Amount",
        dataIndex: "saleAmount",
      },
    ];

    const productsData = [
      {
        key: sale.key,
        productName: sale.productName,
        saleQuantity: sale.saleQuantity,
        saleAmount: sale.salePrice,
      },
    ];

    return (
      <div>
        <div style={{ padding: "50px" }} ref={ref as any}>
          <Flex justify="center" style={{ marginBottom: "20px" }}>
            <img src="/heaven-gift-shop-header.png" alt="" />
          </Flex>
          <Flex justify="center">
            <h2 style={{ fontSize: "48px", fontWeight: "bold" }}>INVOICE</h2>
          </Flex>
          <Flex justify="center" style={{ marginBottom: "50px" }}>
            <h2>{`#${sale.key}`}</h2>
          </Flex>
          <Flex gap={10} align="center" style={{ marginBottom: "10px" }}>
            <Col span={6}>
              <p style={{ fontSize: "22px", fontWeight: "normal" }}>
                Customer Name:
              </p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                {sale.buyerName}
              </p>
            </Col>
          </Flex>

          <Flex gap={10} align="center" style={{ marginBottom: "100px" }}>
            <Col span={6}>
              <p style={{ fontSize: "22px", fontWeight: "normal" }}>
                Sale Date:
              </p>
            </Col>
            <Col span={6}>
              <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                {sale.saleDate}
              </p>
            </Col>
          </Flex>

          <Table
            pagination={false}
            columns={columns}
            dataSource={productsData}
          />
        </div>
      </div>
    );
  }
);

export default Invoice;
