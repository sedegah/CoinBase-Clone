import React from 'react';
import { Logo } from '../common';

const LoadingScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#050F19'
    }}>
      <Logo size={40} />
    </div>
  );
};

export default LoadingScreen;
