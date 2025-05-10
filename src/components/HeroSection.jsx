import React, { useState } from 'react';
import './HeroSection.css';
import logo from '../assets/Stand-Oline_logo_White-removebg-preview.png';
import backgroundImage from '../assets/header_desktop1.webp';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [filters, setFilters] = useState({
    marca: '',
    combustivel: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    const query = new URLSearchParams(filters).toString();
    navigate(`/resultados?${query}`);
  };

  return (
    <section
      className="hero-section d-flex align-items-center text-white text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
      }}
    >
      <div className="container hero-content">
        <div className="logo-hero mb-3">
          <img src={logo} alt="Logo Stand Online" className="img-fluid" style={{ maxWidth: '400px' }} />
        </div>

        <h2 className="fw-bold mb-4">Que Viatura Procura?</h2>

        <div className="search-form bg-white rounded-pill shadow p-3 px-4 d-flex flex-wrap align-items-center justify-content-center gap-3">
          <div className="form-group">
            <label className="form-label text-primary small">Marca</label>
            <select
              name="marca"
              className="form-select border-0"
              value={filters.marca}
              onChange={handleChange}
            >
              <option value="">Selecionar</option>
              <option>BMW</option>
              <option>Porsche</option>
              <option>Fiat</option>
              <option>Jeep</option>
              <option>Ford</option>
              <option>Hyundai</option>
              <option>Volkswagem</option>
              <option>Ferrari</option>
              <option>Peugeot</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label text-primary small">Combustível</label>
            <select
              name="combustivel"
              className="form-select border-0"
              value={filters.combustivel}
              onChange={handleChange}
            >
              <option value="">Selecionar</option>
              <option>Electrico</option>
              <option>Gasolina</option>
              <option>Gaséleo</option>
              <option>Híbrido Gasolina</option>
              <option>Híbrido Plug-In Gasolina</option>
              <option>Diesel</option>
            </select>
          </div>

          <button
            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '48px', height: '48px' }}
            onClick={handleSearch}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>

        <div className="mt-4">
          <button className="btn btn-light rounded-pill shadow-sm px-4 py-2">
            <i className="bi bi-filter me-2"></i> PESQUISA DETALHADA
          </button>
        </div>
      </div>
    </section>
  );
}
