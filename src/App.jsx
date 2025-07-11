import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Gestores from './pages/Gestores';
import Motoristas from './pages/Motoristas';
import Carros from './pages/Carros';
import Eventos from './pages/Eventos';
import Relatorios from './pages/Relatorios';
import Layout from './components/Layout';
import './App.css';

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/gestores" element={
              <ProtectedRoute>
                <Layout>
                  <Gestores />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/motoristas" element={
              <ProtectedRoute>
                <Layout>
                  <Motoristas />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/carros" element={
              <ProtectedRoute>
                <Layout>
                  <Carros />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/eventos" element={
              <ProtectedRoute>
                <Layout>
                  <Eventos />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/relatorios" element={
              <ProtectedRoute>
                <Layout>
                  <Relatorios />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
