import React from 'react';

interface DisplayProps {
  value: string;
  total: string;
}

const Display: React.FC<DisplayProps> = ({ value, total }) => {
  const formatDisplay = (input: string): string => {
    let formattedInput = input
      .replace(/\//g, '÷')
      .replace(/\*/g, 'x')
      .replace(/\./g, ',');

    formattedInput = formattedInput.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return formattedInput;
  };

  return (
    <div className="display">
      <span>{formatDisplay(value)}</span>
      {total && <div className="total-value">{formatDisplay(total)}</div>}
    </div>
  );
};

export default Display;