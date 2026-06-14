import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Swallowing benign WebSocket errors that occur in the iframe sandbox environment
if (typeof window !== 'undefined') {
  const handleWebSocketError = (event: ErrorEvent | PromiseRejectionEvent) => {
    const errorMsg = 'message' in event ? event.message : '';
    const reasonMsg = 'reason' in event && event.reason ? (event.reason.message || String(event.reason)) : '';
    const combined = `${errorMsg} ${reasonMsg}`.toLowerCase();

    if (combined.includes('websocket') || combined.includes('ws://') || combined.includes('sockjs')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  window.addEventListener('error', handleWebSocketError, { capture: true });
  window.addEventListener('unhandledrejection', handleWebSocketError, { capture: true });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
