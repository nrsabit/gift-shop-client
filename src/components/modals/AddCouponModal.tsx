import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { useAddNewCouponMutation } from "../../redux/features/products/productApi";

const AddCouponModal = () => {
  const [createCoupon] = useAddNewCouponMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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
    const toastId = toast.loading("Creating...!!", { duration: 2000 });

    const couponData = {
      ...data,
      percentage: Number(data.percentage),
    };

    try {
      const res = (await createCoupon(couponData)) as any;
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
      <Button onClick={showModal}>Add Coupon</Button>
      <Modal
        title={`Create a new coupon`}
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
          <Form.Item<string>
            label="Coupon Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please input the coupon code",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item<string>
            label="Discount Percentage"
            name="percentage"
            rules={[
              { required: true, message: "Please input the percentage value" },
            ]}
          >
            <Input type="number" max={100} />
          </Form.Item>

          <Button htmlType="submit">Create</Button>
        </Form>
      </Modal>
    </>
  );
};

export default AddCouponModal;
