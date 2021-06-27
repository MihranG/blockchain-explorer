import { FC, useEffect, useState } from 'react';
import { Card, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import { numberFromHexString } from '../utils/helpers';
import { RootState } from '../store/store';
import Loading from './Loading';
import { fetchBlock } from '../store/thunks';
import TransactionPagination from './TransactionPaginations';

export interface IPageObject {
  qty: number;
  current: number;
  perPage: number;
}

const Transactions: FC<{}> = () => {
  const match = useRouteMatch<{ id?: string }>();
  const dispatch = useDispatch();
  const [page, setPage] = useState<IPageObject>({
    qty: 0,
    current: 0,
    perPage: 10,
  });
  const { data, loading } = useSelector((state: RootState) => state.block);
  const { transactions, number, timestamp } = data?.result ?? {};

  useEffect(() => {
    // functionality is intended for fetching data in case if user uses :id/transactions url for seeing the results
    if (data.id === -1 && !data.result && !loading && match.params.id) {
      dispatch(fetchBlock(match.params.id));
    }
  }, [match.params]);

  useEffect(() => {
    if (transactions && transactions.length) {
      const qty = Math.ceil(transactions.length / page.perPage);
      const current = 1;
      setPage({ ...page, qty, current });
    }
  }, [transactions, page.perPage]);

  const onPage = (currentPage: number) => {
    setPage({ ...page, current: currentPage });
  };

  const onPerPage = (perPage: number) => {
    setPage({ ...page, perPage });
  };

  return (
    <Container className="transaction">
      <Card className="my-5">
        <Card.Header className="transaction__header">
          <div>
            Transactions of block:&nbsp;
            <Link to={'/' + number} className="font-weight-bold">
              #{number}
            </Link>
          </div>
          <div>
            Date of transaction: &nbsp;
            <span className="font-weight-bold">{timestamp} </span>
          </div>
          {transactions?.length && (
            <div>
              <span className="font-weight-bold">{transactions.length} </span>
              Transactions
            </div>
          )}
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Loading />
          ) : (
            transactions &&
            transactions.length > 0 && (
              <>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  size="sm"
                  className="transaction__table"
                >
                  <thead>
                    <tr>
                      <th align="left">Id</th>
                      <th>Hash</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions
                      .slice(
                        (page.current - 1) * page.perPage,
                        page.current * page.perPage
                      )
                      .map((transaction, idx) => {
                        return (
                          <tr key={idx}>
                            <td>
                              {numberFromHexString(
                                transaction.transactionIndex
                              )}
                            </td>
                            <td>{transaction.hash}</td>
                            <td>{transaction.from}</td>
                            <td>{transaction.to}</td>
                            <td>
                              {Math.round(
                                (numberFromHexString(transaction.value) /
                                  Math.pow(10, 18)) *
                                  1000
                              ) / 1000}{' '}
                              Eth
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                <TransactionPagination
                  onPage={onPage}
                  pageObject={page}
                  onPerPage={onPerPage}
                />
              </>
            )
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Transactions;
