import { Button, Flex, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  _id: any;
  key: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  category: string;
  brand: string;
  material: string;
  color: string;
  occasion: string;
  theme: string;
}

const ManageProducts = () => {
  const { data: allProducts } = useGetAllProductsQuery(undefined);
  const navigate = useNavigate();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "productName",
    },
    {
      title: "Price",
      dataIndex: "productPrice",
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      responsive: ["sm"],
    },
    {
      title: "Category",
      dataIndex: "category",
      responsive: ["sm"],
    },
    {
      title: "Theme",
      dataIndex: "theme",
      responsive: ["sm"],
    },
    {
      title: "Occasion",
      dataIndex: "occasion",
      responsive: ["sm"],
    },
    {
      title: "Brand",
      dataIndex: "brand",
      responsive: ["sm"],
    },
    {
      title: "Material",
      dataIndex: "material",
      responsive: ["sm"],
    },
    {
      title: "Color",
      dataIndex: "color",
      responsive: ["sm"],
    },
    {
      title: "Sell & Duplicate",
      key: "x",
      render: (item) => {
        return (
          <Flex gap={"small"}>
            <Button>Sell</Button>
            <Button onClick={() => console.log(item.key)}>
              Create Variant
            </Button>
          </Flex>
        );
      },
    },
    {
      title: "Actions",
      key: "x",
      width: "8%",
      render: (item) => {
        return (
          <Flex gap={"small"}>
            <button onClick={() => navigate(`/edit-product/${item?.key}`)}>
              <img src="/pen.png" alt="" />{" "}
            </button>
            <button>
              <img src="/bin.png" alt="" />{" "}
            </button>
          </Flex>
        );
      },
    },
  ];

  const productsData = allProducts?.data?.map((product: DataType) => ({
    key: product._id,
    productName: product.productName,
    productPrice: `$${product.productPrice}`,
    productQuantity: product.productQuantity,
    category: product.category,
    brand: product.brand,
    theme: product.theme,
    occasion: product.occasion,
    color: product.color,
    material: product.material,
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
