import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { store, } from './app/store';
import App from './App.tsx'
import './index.css'
import { ToastProvider } from './components/ToastContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} > */}
      <ToastProvider>
        <App />
      </ToastProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode >,
)