import React from 'react';
import './styles/calculator.css'
import Calculator from './components/Calculator';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div id="app">
      <Header />
      <Calculator />
    </div>
  );
};

export default App;