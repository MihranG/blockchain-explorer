import { FC } from 'react';
import { Card, Container, Table } from 'react-bootstrap';
import { ITransaction } from './types/Interfaces';
import { useHistory } from 'react-router-dom';
import { numberFromHexString } from './utils/helpers';

interface ITransactionProps {
  blockNumber: number;
  transactions: ITransaction[];
}

const Transactions: FC<{}> = () => {
  const history = useHistory<ITransactionProps>();

  const { transactions, blockNumber } = history.location?.state;
  console.log('tra', transactions);
  return (
    <Container className="transaction">
      <Card className="my-5">
        <Card.Header>Transactions of block: #{blockNumber}</Card.Header>
        <Card.Body>
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
                <th>Hash</th>
                <th>Data</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, idx) => {
                return (
                  <tr key={idx}>
                    <td>{transaction.hash}</td>
                    <td>{'asdasd' ?? transaction}</td>
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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Transactions;
