import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";
import { useState } from "react";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  _id: any;
  key: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  category: string;
  brand: string;
}

const ManageProducts = () => {
  const { data: allProducts } = useGetAllProductsQuery(undefined);
  console.log(allProducts);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
    },
    {
      title: "Available Quantity",
      dataIndex: "productQuantity",
    },
    {
      title: "Category",
      dataIndex: "category",
      responsive: ["sm"],
    },
    {
      title: "Brand",
      dataIndex: "brand",
      responsive: ["sm"],
    },
  ];

  const productsData = allProducts?.data?.map((product: DataType) => ({
    key: product._id,
    productName: product.productName,
    productPrice: `$${product.productPrice}`,
    productQuantity: product.productQuantity,
    category: product.category,
    brand: product.brand,
  }));

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  return (
    <>
      <Table
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={productsData}
      />
      <Button hidden={!selectedRowKeys.length} style={{ marginTop: "50px" }}>
        Delete Selected
      </Button>
    </>
  );
};

export default ManageProducts;
