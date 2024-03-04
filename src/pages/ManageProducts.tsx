import {
  Button,
  Col,
  Flex,
  Input,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  useDeleteAllProductsMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../redux/features/products/productApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setProduct } from "../redux/features/products/productSlice";
import SellModal from "../components/modals/SaleModal";
import ProductDetailsModal from "../components/modals/ProductDetailsModal";
import FilterModal from "../components/modals/FilterModal";
import { currentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import AddCouponModal from "../components/modals/AddCouponModal";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

type DataType = {
  _id: any;
  key: string;
  productName: string;
  productPrice: string;
  productQuantity: number;
  category: string;
  brand: string;
  material: string;
  color: string;
  occasion: string;
  theme: string;
};

const ManageProducts = () => {
  const [queries, setQueries] = useState({});
  const { data: allProducts } = useGetAllProductsQuery(queries, {
    skip: !queries,
  });
  const navigate = useNavigate();
  const [deleteAllProducts] = useDeleteAllProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(currentToken);

  let user: Record<string, any> = {};
  if (token) {
    user = verifyToken(token) as Record<string, any>;
  }

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
      sorter: (a, b) =>
        parseFloat(a.productPrice.slice(1)) -
        parseFloat(b.productPrice.slice(1)),
      responsive: ["sm"],
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      sorter: (a, b) => a.productQuantity - b.productQuantity,
      responsive: ["sm"],
    },
    {
      title: "Category",
      dataIndex: "category",
      responsive: ["lg"],
    },
    {
      title: "Theme",
      dataIndex: "theme",
      responsive: ["lg"],
    },
    {
      title: "Occasion",
      dataIndex: "occasion",
      responsive: ["lg"],
    },
    {
      title: "Brand",
      dataIndex: "brand",
      responsive: ["lg"],
    },
    {
      title: "Material",
      dataIndex: "material",
      responsive: ["lg"],
    },
    {
      title: "Color",
      dataIndex: "color",
      responsive: ["lg"],
    },
    {
      title: "Sell & Duplicate",
      key: "x",
      render: (item) => {
        return (
          <Flex gap={"small"}>
            <SellModal product={item}></SellModal>
            <Button
              hidden={user?.role !== "manager"}
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
      render: (item) => {
        return (
          <Flex gap={"small"}>
            <button
              hidden={user?.role !== "manager"}
              onClick={() => {
                dispatch(setProduct({ product: item }));
                navigate(`/edit-product/${item?.key}`);
              }}
            >
              <img style={{ maxWidth: "30px" }} src="/pen.png" alt="" />{" "}
            </button>
            <ProductDetailsModal product={item}></ProductDetailsModal>
            <button
              hidden={user?.role !== "manager"}
              onClick={() => handleDelete(item.key)}
            >
              <img style={{ maxWidth: "30px" }} src="/bin.png" alt="" />{" "}
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
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        setSelectedRowKeys([]);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <Flex style={{ marginBottom: "30px" }} gap={10}>
        <Col span={18} md={{ span: 12 }} lg={{ span: 6 }}>
          <Input
            onBlur={(e) =>
              setQueries(
                e.target.value !== "" ? { searchTerm: e.target.value } : {}
              )
            }
            placeholder="search by name, brand, category, color"
          ></Input>
        </Col>
        <FilterModal setQueries={setQueries}></FilterModal>
        {user?.role === "manager" && <AddCouponModal></AddCouponModal>}
      </Flex>
      <Table
        pagination={false}
        rowSelection={user?.role === "manager" ? rowSelection : undefined}
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
