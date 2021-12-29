import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import i18n from './i18n';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import App from './pages/App';
// import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
