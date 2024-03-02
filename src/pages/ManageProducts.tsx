import { Button, Flex, Table, TableColumnsType, TableProps } from "antd";
import {
  useDeleteAllProductsMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../redux/features/products/productApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { setProduct } from "../redux/features/products/productSlice";

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
  const [deleteAllProducts] = useDeleteAllProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting...!!", { duration: 2000 });

    try {
      const res = (await deleteProduct(id)) as any;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

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
            <Button
              onClick={() => {
                dispatch(setProduct({ product: item }));
                navigate(`/create-variant/${item?.key}`);
              }}
            >
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
            <button
              onClick={() => {
                dispatch(setProduct({ product: item }));
                navigate(`/edit-product/${item?.key}`);
              }}
            >
              <img src="/pen.png" alt="" />{" "}
            </button>
            <button onClick={() => handleDelete(item.key)}>
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
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  const handleBulkDelete = async () => {
    const toastId = toast.loading("Deleting...!!", { duration: 2000 });

    try {
      const res = (await deleteAllProducts(selectedRowKeys)) as any;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <Table
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={productsData}
      />
      <Button
        hidden={!selectedRowKeys.length}
        style={{ marginTop: "50px" }}
        onClick={handleBulkDelete}
      >
        Delete Selected
      </Button>
    </>
  );
};

export default ManageProducts;
