import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/Global';
import theme from './styles/theme';
import App from './App';
import './index.css';
import { setupStore } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={setupStore}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
