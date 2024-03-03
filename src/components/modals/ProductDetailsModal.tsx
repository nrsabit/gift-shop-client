import { Col, Modal, Row } from "antd";
import { useState } from "react";

const ProductDetailsModal = ({ product }: Record<string, any>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>
        <img style={{ maxWidth: "30px" }} src="/info.png" alt="" />{" "}
      </button>
      <Modal
        title={"Product Details"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2>Name: </h2>
          <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
            {product.productName}
          </h4>
        </div>
        <Row>
          <Col span={12}>
            <div style={{ marginBottom: "20px" }}>
              <h2>Product Price: </h2>
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {`${product.productPrice}`}
              </h4>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: "20px" }}>
              <h2>Available Quantity </h2>
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {product.productQuantity}
              </h4>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <div style={{ marginBottom: "20px" }}>
              <h2>Category: </h2>
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {product.category}
              </h4>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: "20px" }}>
              <h2>Brand: </h2>
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {product.brand}
              </h4>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <div style={{ marginBottom: "20px" }}>
              <h2>Material: </h2>
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {product.material}
              </h4>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: "20px" }}>
              <h2>Color: </h2>
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {product.color}
              </h4>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <div style={{ marginBottom: "20px" }}>
              <h2>Occasion: </h2>
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {product.occasion}
              </h4>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: "20px" }}>
              <h2>Theme: </h2>
              <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>
                {product.theme}
              </h4>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ProductDetailsModal;
