import React, { useState } from 'react';

const Row = ({ item, data, setData }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAllocationPercent = () => {
    const percentage = parseInt(inputValue);
    
    if (isNaN(percentage)) {
      alert("Please enter a valid number");
      return;
    }
    const newValue = item.originalValue * (1 + percentage / 100);
    console.log(item.originalValue)
    updateValue(item.id, newValue);
  };

  const handleAllocationValue = () => {
    const newValue = parseInt(inputValue);
    if (isNaN(newValue)) {
      alert("Please enter a valid number");
      return;
    }
    updateValue(item.id, newValue);
  };

  const updateValue = (id, newValue) => {
    const updateData = (data) => {
      return data.map(d => {
        if (d.id === id) {
          return { ...d, value: newValue }; // Update the value without modifying originalValue
        } else if (d.children) {
          const updatedChildren = updateData(d.children);
          const updatedValue = updatedChildren.reduce((acc, child) => acc + child.value, 0);
          return { ...d, children: updatedChildren, value: updatedValue };
        }
        return d;
      });
    };

    setData(updateData(data));
  };

  const calculateVariance = () => {
    if (item.originalValue === 0) {
      return "0.00"; // Avoid division by zero
    }
    const variance = (((item.value - item.originalValue) / item.originalValue) * 100).toFixed(2);
    return isNaN(variance) ? "0.00" : variance;
  };

  return (
    <>
      <tr>
        <td>{item.label}</td>
        <td>{item.value.toFixed(2)}</td>
        <td>
          <input 
            type="number" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
          />
        </td>
        <td>
          <button onClick={handleAllocationPercent}>Allocate %</button>
        </td>
        <td>
          <button onClick={handleAllocationValue}>Allocate Value</button>
        </td>
        <td>{calculateVariance()}%</td>
      </tr>
      {item.children && item.children.map(child => (
        <Row key={child.id} item={child} data={data} setData={setData} />
      ))}
    </>
  );
};

export default Row;
