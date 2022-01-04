import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import App from './pages/App';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
