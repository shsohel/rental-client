import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const ListLoader = ({ rowLength, colLength, hidden }) => {
  const rows = Array(rowLength).fill(2);
  const cols = Array(colLength).fill(2);

  return (
    <>
      {rows.map((i, index) => (
        <tr key={index + 1} hidden={hidden}>
          {cols.map((i, indx) => (
            <td key={indx + 1}>{<Skeleton height={30} />}</td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default ListLoader;
