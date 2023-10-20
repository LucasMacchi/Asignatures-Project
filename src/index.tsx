import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalState from './Context/Global/GlobalState';
//theme
import { ThemeProvider } from '@emotion/react';
import theme from './Theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
      <BrowserRouter>
        <React.StrictMode>
          <GlobalState>
            <App />
          </GlobalState>
          
      </React.StrictMode>
    </BrowserRouter>
  </ThemeProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
