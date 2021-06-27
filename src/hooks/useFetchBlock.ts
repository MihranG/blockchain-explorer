import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchBlock } from '../store/thunks';
import { RootState } from '../store/store';

const useFetchBlock = <T>(
  id: string,
  extraDep: T | undefined = undefined
): void => {
  const dispatch = useDispatch();
  const number = useSelector((s: RootState) => s.block.data.result?.number);

  useEffect(() => {
    if (id !== number) {
      dispatch(fetchBlock(id));
    }
  }, [dispatch, id, extraDep, number]);
};

export default useFetchBlock;
