import React from 'react';
import logoEmix from '../assets/emix-logo.png'

const Header: React.FC = () => {
  return (
    <header>
      <img src={logoEmix} alt='Logo eMix' title='Logo eMix' width='120px' />
    </header>
  );
};

export default Header;
