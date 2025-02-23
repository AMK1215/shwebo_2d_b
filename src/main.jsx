import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RouterProvider router={router}/>
  </AuthContextProvider>
);