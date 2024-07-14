import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserInfo from './Components/UserInfo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Questionare from './Components/Questionare';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/questions" element={<Questionare />} />
      <Route path="/user/:id" element={<UserInfo />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
    </Routes>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
