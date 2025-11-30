import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardCustomer from './pages/DashboardCustomer';
import DashboardAdmin from './pages/DashboardAdmin';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Home/>} />
          <Route path='product/:id' element={<Product/>} />
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='dashboard' element={<DashboardCustomer/>} />
          <Route path='admin' element={<DashboardAdmin/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
