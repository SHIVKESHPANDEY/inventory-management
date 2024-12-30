import React from 'react';
import LoginPage from './components/login/Login';
import Dashboard from './Pages/Dashboard.jsx';
import "./App.css"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Inventory from './Pages/Inventory.jsx';
import Orders from './Pages/Orders.jsx';
import Customers from './Pages/Customers.jsx';
import MyLayout from './Layout/Layout.jsx'
import ManageInventory from './Pages/ManageInventory.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />


      
      <Route path="/" element={<MyLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="ManageInventory" element={<ManageInventory />} />


      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}



export default App;
