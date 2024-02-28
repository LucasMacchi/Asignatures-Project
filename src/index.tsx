import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalState from './Context/Global/GlobalState';
import UserState from './Context/User/UserState';
import Changer from './Components/Changer/Changer';
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
          <UserState>
          <GlobalState>
            <Routes>
              <Route  path="*" element={<App />}/>
              <Route  path="/prestoration/:user_id/:token_id" element={<Changer/>}/>
              <Route  path="/urestoration" element={<Changer/>}/>
            </Routes>
          </GlobalState>
          </UserState>  
      </React.StrictMode>
    </BrowserRouter>
  </ThemeProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
