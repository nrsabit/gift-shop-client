import { Button, Col, Input, Row, Table, TableColumnsType } from "antd";
import { useGetAllSalesQuery } from "../redux/features/sales/saleApi";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Invoice from "../components/modals/Invoice";

type DataType = {
  _id: string;
  key: string;
  productName: string;
  quantity: number;
  salePrice: number;
  buyerName: string;
  saleDate: string;
};

const AllSales = () => {
  const [queries, setQueries] = useState({});
  const componentRef = useRef(null);
  const [selectedSale, setSelectedSale] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any,
  });

  const handleDownloadInvoice = (sale: any) => {
    setSelectedSale(sale);
    setTimeout(() => {
      handlePrint();
    }, 200);
  };

  const { data: allSales } = useGetAllSalesQuery(queries, { skip: !queries });

  // convert the mongodb date format
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const salesData = allSales?.data?.map((sale: DataType) => ({
    key: sale._id,
    productName: sale.productName,
    salePrice: `$${sale.salePrice.toFixed(2)}`,
    saleQuantity: sale.quantity,
    buyerName: sale.buyerName,
    saleDate: formatDate(sale.saleDate),
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "saleQuantity",
      responsive: ["sm"],
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Sale Value",
      dataIndex: "salePrice",
    },
    {
      title: "Invoice",
      key: "x",
      render: (item) => {
        return (
          <Button onClick={() => handleDownloadInvoice(item)}>Download</Button>
        );
      },
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
      <Row style={{ marginBottom: "20px" }}>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <Input
            onBlur={(e) =>
              setQueries(
                e.target.value !== "" ? { searchTerm: e.target.value } : {}
              )
            }
            placeholder="Search by Product and Buyer Name"
          ></Input>
        </Col>
      </Row>
      <Table pagination={false} columns={columns} dataSource={salesData} />

      {/* // invoice download page */}
      <div style={{ display: "none" }}>
        {selectedSale && (
          <Invoice sale={selectedSale} ref={componentRef as any} />
        )}
      </div>
    </>
  );
};

export default AllSales;
