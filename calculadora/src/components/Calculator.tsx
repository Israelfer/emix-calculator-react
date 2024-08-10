import React, { useEffect, useState } from 'react';
import Button from './Button';
import Display from './Display';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [total, setTotal] = useState<string>('0');
  const [lastOperation, setLastOperation] = useState<string>('');

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      if ((key >= '0' && key <= '9') || key === '.') {
        handleButtonClick(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter' || key === '=') {
        handleEqualClick();
      } else if (key === 'Backspace') {
        handleBackspaceClick();
      } else if (key === 'Escape') {
        handleClearClick();
      } else if (key === 'r') {  // Adiciona o mapeamento para a raiz quadrada
        handleSquareRootClick();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleButtonClick = (value: string) => {
    const operators = ['+', '-', '*', '/'];
    const lastChar = input.slice(-1);

    if (operators.includes(value)) {
      if (operators.includes(lastChar)) {
        if (lastChar === value) {
          return;
        } else {
          setInput((prev) => prev.slice(0, -1) + value);
          return;
        }
      }
    }

    setInput((prev) => prev + value);
  };

  const handleEqualClick = () => {
    try {
      if (/\/0/.test(input)) {
        setTotal('Não é possível realizar a divisão por zero');
        return;
      }
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
    setTotal('0');
    setLastOperation('');
  };

  const handleBackspaceClick = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleToggleSign = () => {
    if (input) {
      if (input.startsWith('-')) {
        setInput(input.slice(1));
      } else {
        setInput('-' + input);
      }
    }
  };

  const handleSquareRootClick = () => {
    try {
      const currentNumber = parseFloat(input);
      if (isNaN(currentNumber)) {
        setTotal('Error');
        return;
      }

      if (currentNumber < 0) {
        setTotal('Não é possível calcular a raiz quadrada de um número negativo');
        return;
      }

      const result = Math.sqrt(currentNumber).toString();
      setTotal(result);
      setInput(result);
      setLastOperation('');
    } catch {
      setTotal('Error');
      setInput('Error');
      setLastOperation('');
    }
  };


  return (
    <div className="calculator">
      <Display value={input} total={total} />
      <div className="buttons">
        <Button label="C" className='button-operator' onClick={handleClearClick} />
        <Button label="⌫" className='button-operator' onClick={handleBackspaceClick} />
        <Button label="√" className='button-operator' onClick={handleSquareRootClick} />
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
        <Button label="+/-" onClick={handleToggleSign} />
        <Button label="0" onClick={() => handleButtonClick('0')} />
        <Button label="." onClick={() => handleButtonClick('.')} />
        <Button label="=" className='button-equal' onClick={handleEqualClick} />
      </div>
    </div>
  );
};

export default Calculator;