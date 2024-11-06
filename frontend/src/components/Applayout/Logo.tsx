import React from 'react';

const Header: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        padding: '0',
      }}>
      <span style={{fontSize: '24px', fontWeight: 'bold'}}>MoviEh</span>
    </div>
  );
};

export default Header;
