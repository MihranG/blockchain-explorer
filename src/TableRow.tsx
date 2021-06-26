import { FC } from 'react';

interface ITableRow {
  name: string;
  value: string;
  isLocale?: boolean;
  onClick?: Function;
  extraValue?: string;
}

const TableRow: FC<ITableRow> = ({
  name,
  value,
  isLocale,
  onClick,
  extraValue,
}) => {
  const onClickHandle = () => {
    onClick ? onClick() : console.log('non clickable');
  };
  return (
    <tr onClick={onClickHandle}>
      <td>{name}</td>
      <td>
        {isLocale ? parseInt(value).toLocaleString() : value} {extraValue}
      </td>
    </tr>
  );
};

export default TableRow;
