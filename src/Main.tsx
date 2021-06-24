import { FC, SyntheticEvent, useState } from 'react';
import { Row, Form, Button, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BlockNumberEnums } from './types/enums';

const Main: FC<{}> = () => {
  const history = useHistory();
  const [value, setValue] = useState<string>('');

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    //setValue('');
    history.push(value);
    console.log('submit', value);
  };

  const onLatestClick = () => {
    setValue('');
    history.push(BlockNumberEnums.Latest);
  };

  return (
    <Row className="justify-content-md-center m-5">
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label> Type block number or choose latest</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <Button variant="outline-secondary" onClick={onLatestClick}>
                Latest
              </Button>
            </InputGroup.Prepend>
            <Form.Control
              size="lg"
              type="text"
              placeholder="block number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <InputGroup.Append>
              <Button type="submit" variant="primary">
                Find
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </Row>
  );
};

export default Main;
