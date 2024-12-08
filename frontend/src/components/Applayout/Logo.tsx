import React from 'react';
import logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        padding: '0',
        justifyContent: 'center',
        height: '100%',
      }}>
      <img src={logo} alt="logo" style={{height: '100%'}} />
      <span style={{fontSize: '24px', fontWeight: 'bold'}}>MoviEh</span>
    </div>
  );
};

export default Header;
