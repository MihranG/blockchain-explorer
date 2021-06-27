import { Pagination, Form, Row, Col } from 'react-bootstrap';
import { ChangeEvent, FC } from 'react';
import { IPageObject } from './Transactions';

interface ITransactionPaginationProps {
  onPage: (id: number) => void;
  onPerPage: (id: number) => void;
  pageObject: IPageObject;
}

const PER_PAGE_OPTIONS = [10, 25, 50, 100];

const TransactionPagination: FC<ITransactionPaginationProps> = ({
  onPage,
  pageObject,
  onPerPage,
}) => {
  const { current, qty } = pageObject;

  const onPageNextPrev = (isNext: boolean) => {
    const addition = isNext ? 1 : -1;
    const newPage = current + addition;
    if (newPage <= qty && newPage > 0) {
      onPage(newPage);
    }
  };
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.currentTarget.value);
    onPerPage(newPerPage);
  };

  return (
    <Row className="transaction__pagination">
      <Col>
        <Pagination className="m-0">
          <Pagination.First
            onClick={() => onPage(1)}
            disabled={current === 1}
          />
          <Pagination.Prev
            onClick={() => onPageNextPrev(false)}
            disabled={current === 1}
          />
          {qty &&
            Array(qty)
              .fill(1)
              .map((_, idx, arr) => {
                const currentPage = idx + 1;
                return (
                  <Pagination.Item
                    active={current === currentPage}
                    key={idx}
                    onClick={() => onPage(currentPage)}
                  >
                    {currentPage}
                  </Pagination.Item>
                );
              })}
          <Pagination.Next
            onClick={() => onPageNextPrev(true)}
            disabled={qty === current}
          />
          <Pagination.Last
            onClick={() => onPage(qty)}
            disabled={qty === current}
          />
        </Pagination>
      </Col>
      <Col md={2}>
        <Form.Group className="d-flex">
          <Form.Label className="per-page__label">items per page</Form.Label>
          <Form.Control size="sm" as="select" onChange={onChange}>
            {PER_PAGE_OPTIONS.map((o, idx) => (
              <option key={idx} onClick={() => onPerPage(o)}>
                {o}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default TransactionPagination;
