import { Button, Col, Form, Input, Row } from "antd";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddNewProductMutation,
  useGetSingleProductsQuery,
} from "../redux/features/products/productApi";

const CreateVariant = () => {
  const { productId } = useParams();
  const { data } = useGetSingleProductsQuery(productId, {
    skip: !productId,
  });

  const product = data?.data;

  const [form] = Form.useForm();
  const [addProduct] = useAddNewProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating...!!", { duration: 2000 });

    const giftItemData = {
      ...data,
      productPrice: Number(data.productPrice),
      productQuantity: Number(data.productQuantity),
    };

    try {
      const res = (await addProduct(giftItemData)) as any;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        navigate("/manage-products");
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <h1
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "30px" }}
      >
        Create a New Variant
      </h1>
      <Form
        initialValues={product}
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Row gutter={10}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item<string>
              label="Product Name"
              name="productName"
              rules={[
                { required: true, message: "Please input the product name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item<number>
              label="Price"
              name="productPrice"
              rules={[
                { required: true, message: "Please input the product price" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item<number>
              label="Quantity"
              name="productQuantity"
              rules={[
                {
                  required: true,
                  message: "Please input the available quantity",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item<string>
              label="Occasion"
              name="occasion"
              rules={[
                { required: true, message: "Please input the occasion type" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item<string>
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please input the category" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item<string>
              label="Theme"
              name="theme"
              rules={[
                { required: true, message: "Please input the theme name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item<string>
              label="Brand"
              name="brand"
              rules={[
                { required: true, message: "Please input the brand name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item<string>
              label="Material"
              name="material"
              rules={[
                { required: true, message: "Please input the material type" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item<string>
              label="Color"
              name="color"
              rules={[{ required: true, message: "Please input the color" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Button htmlType="submit">Create</Button>
      </Form>
    </>
  );
};

export default CreateVariant;
