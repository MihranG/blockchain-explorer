import { FC, SyntheticEvent, useCallback, useState, useEffect } from 'react';
import { Row, Form, Button, InputGroup, Card } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { BlockNumberEnums } from '../types/enums';
import useFetchBlock from '../hooks/useFetchBlock';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const BLOCK_MAX_NUMBER = 13000000;

const Main: FC<{}> = () => {
  const history = useHistory();
  const [value, setValue] = useState<string>('');
  useFetchBlock(BlockNumberEnums.Latest);
  const { number, timestamp } =
    useSelector((s: RootState) => s.block.data.result) ?? {};

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    history.push(value);
  };

  const onLatestClick = () => {
    setValue('');
    history.push(BlockNumberEnums.Latest);
  };

  const isInputInvalid = useCallback(
    () => parseInt(value) > BLOCK_MAX_NUMBER || parseInt(value) <= 0,
    [value]
  );

  return (
    <>
      <Row className="justify-content-md-center m-5 main">
        <Form onSubmit={onSubmit}>
          <Form.Group
            controlId="validationFormik01"
            className="main__form-group"
          >
            <Form.Label> Type block number or choose latest</Form.Label>
            <InputGroup className="mb-3" hasValidation>
              <InputGroup.Prepend>
                <Button variant="secondary" onClick={onLatestClick}>
                  Get the Latest
                </Button>
              </InputGroup.Prepend>
              <Form.Control
                size="lg"
                type="number"
                placeholder="block number"
                value={value}
                className="main__number-input"
                isInvalid={isInputInvalid()}
                onChange={(e) => setValue(e.target.value)}
              />
              <InputGroup.Append>
                <Button type="submit" variant="primary">
                  Find
                </Button>
              </InputGroup.Append>
              <Form.Control.Feedback
                type="invalid"
                className="main__number-feedback"
              >
                Please provide a valid block number between 0 -{' '}
                {BLOCK_MAX_NUMBER.toLocaleString()}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </Row>
      <Row className="justify-content-md-center">
        <Card>
          <Card.Body>
            Latest fetched block by {timestamp} is{' '}
            <Link to={`/${number}`}>#{number}</Link>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default Main;
