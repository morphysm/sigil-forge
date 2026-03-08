import { useState } from 'react';
import App from './App';
import AppJa from './App_ja';

export default function AppWrapper() {
  const [lang, setLang] = useState('en');

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 9999,
          backgroundColor: 'transparent',
          border: '2px solid #00ff41',
          color: '#00ff41',
          fontFamily: 'monospace',
          fontWeight: '900',
          fontSize: '1rem',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '2px',
          boxShadow: '0 0 10px rgba(0, 255, 65, 0.4)'
        }}
      >
        {lang === 'en' ? '[ 日本語 ]' : '[ ENGLISH ]'}
      </button>

      {lang === 'en' ? <App /> : <AppJa />}
    </div>
  );
}
