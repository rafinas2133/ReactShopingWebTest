import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import App from './App.jsx';
import './index.css';
import LoginPage from './Pages/login.jsx';
import RegisterPage from './Pages/register.jsx';
import ErrorPage from './Pages/error.jsx';
import ProductsPage from './Pages/product.jsx';

const queryClient = new QueryClient(); // Create a QueryClient instance

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/register',
    element: <RegisterPage/>,
  },
  {
    path: '/products',
    element: <ProductsPage/>,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
