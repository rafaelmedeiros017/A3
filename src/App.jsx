<<<<<<< Updated upstream
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
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedClothes from "./components/FeaturedClothes";
import AdminFeaturedCars from "./pages/AdminFeaturedCars";
import AdminFeaturedRoupas from "./pages/AdminFeaturedRoupas";
import EditarCarro from "./pages/EditarCarro";
import EditarRoupa from "./pages/EditarRoupa";
import CarDetails from "./pages/CarDetails";
import Resultados from "./pages/Resultados";
import Testimonials from "./components/testimonials";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import Viaturas from "./pages/Viaturas";
import Roupas from "./pages/Roupas";
import Localizacao from "./pages/Localizacao";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RopaDetails from "./pages/RopaDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <HeroSection />
                            <FeaturedClothes />
                            <Testimonials />
                            <Footer />
                        </>
                    }
                />
                <Route path="/carro/:id" element={<CarDetails />} />
                <Route path="/roupa/:id" element={<RopaDetails />} />
                <Route
                    path="/admin/featured-cars"
                    element={<AdminFeaturedCars />}
                />
                <Route
                    path="/admin/featured-roupas"
                    element={<AdminFeaturedRoupas />}
                />
                <Route
                    path="/admin/editar-carro/:id"
                    element={<EditarCarro />}
                />
                <Route
                    path="/admin/editar-roupa/:id"
                    element={<EditarRoupa />}
                />
                <Route path="/resultados" element={<Resultados />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/viaturas" element={<Viaturas />} />
                <Route path="/roupas" element={<Roupas />} />
                <Route path="/localizacao" element={<Localizacao />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
>>>>>>> Stashed changes
}

export default App;
