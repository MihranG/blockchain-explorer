import { FC, useEffect, useState } from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { dataProvider } from './api/dataProvider';
import { IResponseData } from './types/Interfaces';
// import { numberFromHexString } from './utils/helpers';
import { hexNumberObjectManipulation } from './utils/exceptions';
import TableRow from './TableRow';
import Loading from './Loading';
import { hexToAsciiString } from './utils/helpers';

const Block: FC<{}> = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const [data, setData] = useState<IResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    dataProvider
      .getBlockData<{ data: IResponseData }>(match.params.id)
      .then((res) => {
        console.log('res', res);
        if (res?.data?.result) {
          const result = hexNumberObjectManipulation(res.data.result);
          setData({ ...res.data, result });
        }
      })
      .catch((e) => {
        console.log('error', e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [match.params]);

  const {
    number,
    timestamp,
    transactions,
    difficulty,
    size,
    gasUsed,
    gasLimit,
    extraData,
  } = data?.result || {};
  const onTransactionsClick = () => {
    history.push(`${match.params.id}/transactions`, {
      transactions,
      blockNumber: number,
    });
  };

  return (
    <Container>
      <Card className="my-5">
        <Card.Header>
          Block Number:{' '}
          {number ? <span className="text-primary">#{number}</span> : '-'}
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Loading />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {number && <TableRow name={'Block height'} value={number} />}
                {timestamp && <TableRow name={'Timestamp'} value={timestamp} />}
                {transactions && (
                  <TableRow
                    name={'Transactions'}
                    value={`${transactions?.length}`}
                    extraValue=" transactions"
                    onClick={onTransactionsClick}
                  />
                )}
                {difficulty && (
                  <TableRow name={'Difficulty'} value={difficulty} isLocale />
                )}
                {size && (
                  <TableRow
                    name={'Size'}
                    value={size}
                    extraValue={' bytes'}
                    isLocale
                  />
                )}
                {gasUsed && gasLimit && (
                  <TableRow
                    name={'Gas Used'}
                    value={gasUsed}
                    isLocale
                    extraValue={`(${
                      (parseInt(gasUsed) * 100) / parseInt(gasLimit)
                    } %)`}
                  />
                )}
                {gasLimit && (
                  <TableRow name={'Gas Limit'} value={gasLimit} isLocale />
                )}
                {extraData && (
                  <TableRow
                    name={'Extra Data'}
                    value={hexToAsciiString(extraData)}
                    extraValue={`(Hex: ${extraData})`}
                  />
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Block;
