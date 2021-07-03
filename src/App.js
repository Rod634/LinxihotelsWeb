import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Routes from './routes/Routes'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={5000}/>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}
