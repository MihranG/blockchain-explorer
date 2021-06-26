import { FC, useEffect } from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TableRow from './TableRow';
import Loading from './Loading';
import { hexToAsciiString } from './utils/helpers';
import { fetchBlock } from './store/thunks';
import { RootState } from './store/store';

const Block: FC<{}> = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlock(match.params.id));
  }, [match.params]);

  const { data, loading } = useSelector(
    (state: RootState) => state.block
  );
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
    history.push(`${match.params.id}/transactions`);
  };

  const getGasUsedPercent = (): string => {
    if (gasUsed && gasLimit) {
      const limit = (parseInt(gasUsed) * 100) / parseInt(gasLimit);
      const limitRounded = Math.round(limit * 1000) / 1000;
      return `( ${limitRounded} %)`;
    } else {
      return 'Unknown error';
    }
  };

  return (
    <Container className="block-item">
      <Card className="my-5">
        <Card.Header>
          Block Number:{' '}
          {number ? <span className="text-primary">#{number}</span> : '-'}
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Loading />
          ) : (
            <Table striped bordered hover className="block-item__table">
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
                    extraValue={getGasUsedPercent()}
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
