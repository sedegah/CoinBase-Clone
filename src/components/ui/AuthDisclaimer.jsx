import React from 'react';

const AuthDisclaimer = () => {
  return (
    <div style={{
      backgroundColor: '#FEF2F2',
      border: '1px solid #EF4444',
      borderRadius: '8px',
      padding: '12px 16px',
      margin: '16px 0',
      fontSize: '13px',
      fontWeight: '500',
      color: '#991B1B',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <span>
        <strong>Demo app</strong> - do not use your real password or personal information
      </span>
    </div>
  );
};

export default AuthDisclaimer;
