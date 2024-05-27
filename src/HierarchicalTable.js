import React from 'react';
import Row from './Row';

const HierarchicalTable = ({ data, setData }) => {
  const calculateTotal = () => {
    return data.reduce((acc, item) => acc + item.value, 0);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <Row key={item.id} item={item} data={data} setData={setData} />
        ))}
        <tr>
          <td>Grand Total</td>
          <td>{calculateTotal()}</td>
          <td colSpan="4"></td>
        </tr>
      </tbody>
    </table>
  );
};

export default HierarchicalTable;
