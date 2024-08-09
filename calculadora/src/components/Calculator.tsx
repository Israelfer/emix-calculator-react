import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [total, setTotal] = useState<string>('')
  const [lastOperation, setLastOperation] = useState<string>('');

  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleEqualClick = () => {
    try {
      if (total && lastOperation) {
        const result = eval(`${total}${lastOperation}`).toString();
        setTotal(result);
        setInput((prev) => `${prev}${lastOperation}`);
      } else {
        const result = eval(input).toString();
        setTotal(result);

        const operation = input.replace(/^[0-9.]+/, '');
        setLastOperation(operation);

        setInput((prev) => `${prev} =`);
      }
    } catch {
      setTotal('Error');
      setInput('Error');
      setLastOperation('');
    }
  };

  const handleClearClick = () => {
    setInput('');
    setTotal('');
    setLastOperation('');
  };

  return (
    <div className="calculator">
      <Display value={input} total={total} />
      <div className="buttons">
        <Button label="C" className='button-operator' onClick={handleClearClick} />
        <Button label="D" className='button-operator' onClick={handleClearClick} />
        <Button label="√" className='button-operator' onClick={handleClearClick} />
        <Button label="÷" className='button-operator' onClick={() => handleButtonClick('/')} />
        <Button label="7" onClick={() => handleButtonClick('7')} />
        <Button label="8" onClick={() => handleButtonClick('8')} />
        <Button label="9" onClick={() => handleButtonClick('9')} />
        <Button label="x" className='button-operator' onClick={() => handleButtonClick('*')} />
        <Button label="4" onClick={() => handleButtonClick('4')} />
        <Button label="5" onClick={() => handleButtonClick('5')} />
        <Button label="6" onClick={() => handleButtonClick('6')} />
        <Button label="-" className='button-operator' onClick={() => handleButtonClick('-')} />
        <Button label="1" onClick={() => handleButtonClick('1')} />
        <Button label="2" onClick={() => handleButtonClick('2')} />
        <Button label="3" onClick={() => handleButtonClick('3')} />
        <Button label="+" className='button-operator' onClick={() => handleButtonClick('+')} />
        <Button label="+/-" onClick={() => handleButtonClick('-')} />
        <Button label="0" onClick={() => handleButtonClick('0')} />
        <Button label="." onClick={() => handleButtonClick('.')} />
        <Button label="=" className='button-equal' onClick={handleEqualClick} />
      </div>
    </div>
  );
};

export default Calculator;
