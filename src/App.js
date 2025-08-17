import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './infrastructure/theme/theme';

// Lazy load pages for better performance
const Login = React.lazy(() => import('./presentation/pages/Login'));
const BoxList = React.lazy(() => import('./presentation/pages/BoxList'));
const BoxDetail = React.lazy(() => import('./presentation/pages/BoxDetail'));
const OrderDetail = React.lazy(() => import('./presentation/pages/OrderDetail'));
const OrderComplete = React.lazy(() => import('./presentation/pages/OrderComplete'));
const OrderHistory = React.lazy(() => import('./presentation/pages/OrderHistory'));
const OrderProcessing = React.lazy(() => import('./presentation/pages/OrderProcessing'));

// Loading component for lazy-loaded pages
const Loading = () => <div>Loading...</div>;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <BoxList />
              </ProtectedRoute>
            } />
            <Route path="/boxes/:id" element={
              <ProtectedRoute>
                <BoxDetail />
              </ProtectedRoute>
            } />
            <Route path="/orders/:id" element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            } />
            <Route path="/orders/:id/complete" element={
              <ProtectedRoute>
                <OrderComplete />
              </ProtectedRoute>
            } />
            <Route path="/orders/processing" element={
              <ProtectedRoute>
                <OrderProcessing />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            } />

            {/* Redirect to login for unknown routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
