import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const WARNING_DISMISSED_KEY = 'crypto_app_warning_dismissed';

const WarningBanner = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem(WARNING_DISMISSED_KEY);
    setVisible(dismissed !== 'true');
  }, []);

  if (!visible) {
    return null;
  }

  const path = location.pathname;
  const isAuthPage = path === '/signin' || path === '/signup';
  const isDashboard = path === '/dashboard';
  const message = isAuthPage
    ? 'Demo app clone — do not use your real password or personal information. This site is not affiliated with Coinbase.'
    : isDashboard
      ? 'Crypto dashboard powered by CoinGecko. This is a clone and not a real trading platform.'
      : 'This is a student project clone. Not affiliated with Coinbase. Do not enter real personal or financial information.';

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FEF3C7',
      borderBottom: '1px solid #F59E0B',
      padding: '12px 16px',
      gap: '12px',
      fontSize: 14,
      fontWeight: 500,
      color: '#92400E'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <div style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          backgroundColor: '#F59E0B',
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0
        }}>
          !
        </div>
        <div style={{ minWidth: 0, lineHeight: 1.4 }}>
          {message}
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.setItem(WARNING_DISMISSED_KEY, 'true');
          setVisible(false);
        }}
        aria-label="Close banner"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#92400E',
          fontSize: 22,
          lineHeight: 1,
          cursor: 'pointer'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default WarningBanner;
