import { Button, Form, Input, Modal, Radio } from "antd";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";

type TFilterModalProps = Record<string, any>;

const FilterModal = ({ setQueries }: TFilterModalProps) => {
  const { data: allProducts } = useGetAllProductsQuery(undefined);
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
    setQueries(data);
    handleOk();
  };

  return (
    <>
      <Button onClick={showModal}>Filter</Button>
      <Modal
        title={"Filter"}
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
          <Form.Item<string> label="Filter by Occasion" name="occasion">
            <Radio.Group>
              {Array.from(
                new Set(
                  allProducts?.data?.map((product: any) => product?.occasion)
                )
              ).map((occasion: any, index) => (
                <Radio key={index} value={occasion}>
                  {occasion}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item<string> label="Filter by Category" name="category">
            <Radio.Group>
              {Array.from(
                new Set(
                  allProducts?.data?.map((product: any) => product?.category)
                )
              ).map((category: any, index) => (
                <Radio key={index} value={category}>
                  {category}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item<string> label="Filter by Theme" name="theme">
            <Radio.Group>
              {Array.from(
                new Set(
                  allProducts?.data?.map((product: any) => product?.theme)
                )
              ).map((theme: any, index) => (
                <Radio key={index} value={theme}>
                  {theme}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item<string> label="Filter by Brand" name="brand">
            <Radio.Group>
              {Array.from(
                new Set(
                  allProducts?.data?.map((product: any) => product?.brand)
                )
              ).map((brand: any, index) => (
                <Radio key={index} value={brand}>
                  {brand}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item<string> label="Filter by Color" name="color">
            <Radio.Group>
              {Array.from(
                new Set(
                  allProducts?.data?.map((product: any) => product?.color)
                )
              ).map((color: any, index) => (
                <Radio key={index} value={color}>
                  {color}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item<string>
            label="Min. Price"
            name="minPrice"
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item<string>
            label="Max. Price"
            name="maxPrice"
          >
            <Input type="number" />
          </Form.Item>

          <Button style={{marginRight: "12px"}} htmlType="submit">Filter</Button>
          <Button
            onClick={() => {
              form.resetFields();
              setQueries({});
              handleOk();
            }}
          >
            Reset Filters
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default FilterModal;
