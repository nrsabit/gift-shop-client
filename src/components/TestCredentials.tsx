import { Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const TestCredentials = () => {
  return (
    <div style={{marginTop: "30px", marginBottom: "30px", width: "70%"}}>
      <Title level={2} style={{textAlign: "center"}}>Test Credentials</Title>
      <Row>
        <Col span={24} md={{span: 12}}>
          <Title level={4}>Manager</Title>
          <Text>Email: naeem@sabit.com</Text><br />
          <Text>Password: user12345</Text>
        </Col>
        <Col span={24} md={{span: 12}}>
          <Title level={4}>User</Title>
          <Text>Email: naeemur@rahman.com</Text><br />
          <Text>Password: user12345</Text>
        </Col>
      </Row>
    </div>
  );
};

export default TestCredentials;
