import { Row, Spinner } from 'react-bootstrap';

const Loading = () => (
  <Row className="justify-content-center">
    <Spinner animation="border" variant="secondary" />
  </Row>
);

export default Loading;
