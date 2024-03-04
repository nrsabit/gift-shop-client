import { Button, Col, DatePicker, Flex, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateSaleMutation } from "../../redux/features/sales/saleApi";
import { useAppSelector } from "../../redux/hooks";
import { currentUser } from "../../redux/features/auth/authSlice";
import { useVerifyCouponMutation } from "../../redux/features/products/productApi";

const SellModal = ({ product }: Record<string, any>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const [couponPercentage, setCouponPercentage] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponDataResponse, setCouponDataResponse] = useState(null);
  const [form] = Form.useForm();
  const user = useAppSelector(currentUser);
  const [sellProduct] = useCreateSaleMutation();
  const [verifyCoupon] = useVerifyCouponMutation();
  const productPrice = parseFloat(product?.productPrice.slice(1));

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setCouponDataResponse(null);
    setTotalPrice(0);
    setCouponPercentage(0);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCouponDataResponse(null);
    setTotalPrice(0);
    setCouponPercentage(0);
    form.resetFields();
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Selling...!!", { duration: 2000 });

    const saleData = {
      ...data,
      quantity: Number(data.quantity),
      product: product.key,
      productName: product.productName,
      seller: user?._id,
      discountPercentage: couponPercentage,
    };

    delete saleData.coupon;

    try {
      const res = (await sellProduct(saleData)) as any;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        handleOk();
        form.resetFields();
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const applyCoupon = async () => {
    const res = (await verifyCoupon({ code: couponValue })) as any;
    setCouponDataResponse(res);
    if (res.data.data.percentage) {
      setCouponPercentage(res.data.data.percentage);
    }
  };

  return (
    <>
      <Button onClick={showModal}>Sell</Button>
      <Modal
        title={product.productName}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item<number>
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input the quantity..!",
              },
            ]}
          >
            <Input
              onBlur={(e) =>
                setTotalPrice(Number(e.target.value) * productPrice)
              }
              type="number"
              max={product?.productQuantity}
            />
          </Form.Item>

          <Form.Item<string>
            label="Buyer Name"
            name="buyerName"
            rules={[
              { required: true, message: "Please input the buyer name..!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<string>
            label="Sale Date"
            name="saleDate"
            rules={[{ required: true, message: "Please input the date..!" }]}
          >
            <DatePicker style={{ width: "100%" }}></DatePicker>
          </Form.Item>

          <Form.Item<string> label="Seller" name="seller">
            <Input
              defaultValue={user?.userName as string}
              disabled={true}
              style={{ width: "100%" }}
            ></Input>
          </Form.Item>

          <Flex
            gap={10}
            style={{ width: "100%" }}
            align="center"
            justify="between"
          >
            <Form.Item<string> label="Apply Coupon" name="coupon">
              <Input
                onBlur={(e) => setCouponValue(e.target.value)}
                style={{ width: "100%" }}
              ></Input>
            </Form.Item>
            <Button onClick={applyCoupon}>Apply</Button>
          </Flex>

          <Row style={{ marginBottom: "20px" }}>
            <Col span={24}>
              <small
                style={{
                  display: !couponDataResponse && "none",
                  color:
                    couponDataResponse &&
                    (couponDataResponse as Record<string, any>)?.data?.data
                      ? "green"
                      : "red",
                }}
              >
                {couponDataResponse &&
                (couponDataResponse as Record<string, any>)?.data?.data
                  ? `Congratulations..! You have got ${
                      (couponDataResponse as Record<string, any>)?.data?.data
                        .percentage
                    }% discount`
                  : "Invalid coupon"}
              </small>
            </Col>

            <Col span={24}>
              {!!totalPrice && (
                <p
                  style={{
                    display: (couponDataResponse as any)?.data?.data && "none",
                  }}
                >
                  Your Total Price is: <b>${totalPrice.toFixed(2)}</b>
                </p>
              )}
            </Col>

            <Col span={24}>
              {!!totalPrice && (
                <p
                  style={{
                    display: (couponDataResponse as any)?.data?.data
                      ? "block"
                      : "none",
                  }}
                >
                  Your Total Price is:{" "}
                  <del style={{ color: "red" }}>${totalPrice.toFixed(2)}</del>{" "}
                  <b>
                    $
                    {(
                      totalPrice -
                      (totalPrice * couponPercentage) / 100
                    ).toFixed(2)}
                  </b>
                </p>
              )}
            </Col>
          </Row>

          <Button htmlType="submit">Sell</Button>
        </Form>
      </Modal>
    </>
  );
};

export default SellModal;
