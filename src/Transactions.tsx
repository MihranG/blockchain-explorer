import {FC, useEffect} from 'react';
import { Card, Container, Table } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {useRouteMatch} from 'react-router-dom';
import { numberFromHexString } from './utils/helpers';
import {RootState} from "./store/store";
import Loading from "./Loading";
import {fetchBlock} from "./store/thunks";

const Transactions: FC<{}> = () => {
  const match = useRouteMatch<{id?:string}>();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState)=>state.block);
  const {transactions, number} = data?.result ?? {};

  useEffect(()=>{
    // functionality is intended for fetching data in case if user uses :id/transactions url for seeing the results
    if(data.id === -1 && !data.result && !loading && match.params.id){
      dispatch(fetchBlock(match.params.id))
    }

  },[match.params])

  return (
    <Container className="transaction">
      <Card className="my-5">
        <Card.Header>Transactions of block: #{number}</Card.Header>
        <Card.Body>
          {loading ?
            <Loading/> :
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
                {transactions?.length && transactions.map((transaction, idx) => {
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
            </Table>}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Transactions;
