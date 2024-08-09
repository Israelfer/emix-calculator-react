import React from 'react';

interface DisplayProps {
  value: string;
  total: string;
}

const Display: React.FC<DisplayProps> = ({ value, total }) => {
  return (
    <div className="display">
      <span>
        {value}
      </span>
      {total && <div className="total-value">{total}</div>}
    </div>
  );
};

export default Display;