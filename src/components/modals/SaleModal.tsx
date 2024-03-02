import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateSaleMutation } from "../../redux/features/sales/saleApi";

const SellModal = ({ product }: Record<string, any>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [sellProduct] = useCreateSaleMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Selling...!!", { duration: 2000 });

    const saleData = {
      ...data,
      quantity: Number(data.quantity),
      product: product.key,
      productName: product.productName,
    };

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
            <Input type="number" max={product?.productQuantity} />
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

          <Button htmlType="submit">Sell</Button>
        </Form>
      </Modal>
    </>
  );
};

export default SellModal;
