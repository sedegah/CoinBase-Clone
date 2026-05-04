import React from 'react';

const FooterDisclaimer = () => {
  return (
    <footer style={{
      backgroundColor: '#1F2937',
      color: '#9CA3AF',
      padding: '24px 16px',
      textAlign: 'center',
      fontSize: '12px',
      lineHeight: '1.5',
      borderTop: '1px solid #374151'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: '#F3F4F6' }}>Important Notice:</strong> This is a demo project created for educational purposes only.
        </div>
        <div style={{ marginBottom: '12px' }}>
          This application is not affiliated with, endorsed by, or connected to Coinbase, Inc. in any way.
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>Do not enter real personal information, passwords, or financial data.</strong>
        </div>
        <div>
          This is a student project to demonstrate web development skills. All cryptocurrency data shown is for demonstration purposes only.
        </div>
        <div style={{ marginTop: '16px', fontSize: '11px', color: '#6B7280' }}>
          © 2024 Crypto App | Educational Project
        </div>
      </div>
    </footer>
  );
};

export default FooterDisclaimer;
