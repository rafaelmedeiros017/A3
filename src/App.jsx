import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedCars from './components/FeaturedCars';
import AdminFeaturedCars from './pages/AdminFeaturedCars';
import EditarCarro from './pages/EditarCarro';
import CarDetails from './pages/CarDetails';
import Resultados from './pages/Resultados';
import Testimonials from './components/testimonials';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage'
import Viaturas from './pages/Viaturas';
import Localizacao from './pages/Localizacao';

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
              <FeaturedCars />
              <Testimonials/>
              <Footer/>
            </>
          }
        />
        <Route path="/carro/:id" element={<CarDetails />} />
        <Route path="/admin/featured-cars" element={<AdminFeaturedCars />} />
        <Route path="/admin/editar-carro/:id" element={<EditarCarro />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/viaturas" element={<Viaturas />} />
        <Route path="/localizacao" element={<Localizacao />} />
      </Routes>
    </Router>
  );
}

export default App;
