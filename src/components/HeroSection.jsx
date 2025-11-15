import React, { useState } from "react";
import "./HeroSection.css";
import logo from "../assets/Stand-Oline_logo_White-removebg-preview.png";
import backgroundImage from "../assets/header_desktop1.webp";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const [filters, setFilters] = useState({
        marca: "",
        tamanho: "",
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

<<<<<<< Updated upstream
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
              <option>Volkswagen</option>
              <option>Ferrari</option>
              <option>Peugeot</option>
              <option>Mercedes-Benz</option>
            </select>
          </div>
=======
    return (
        <section
            className="hero-section d-flex align-items-center text-white text-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
            }}
        >
            <div className="container hero-content">
                <div className="logo-hero mb-3">
                    <img
                        src={logo}
                        alt="Logo Store Online"
                        className="img-fluid"
                        style={{ maxWidth: "400px" }}
                    />
                </div>
>>>>>>> Stashed changes

                <h2 className="fw-bold mb-4">Que Roupa Procura?</h2>

                <div className="search-form bg-white rounded-pill shadow p-3 px-4 d-flex flex-wrap align-items-center justify-content-center gap-3">
                    <div className="form-group">
                        <label className="form-label text-primary small">
                            Marca
                        </label>
                        <select
                            name="marca"
                            className="form-select border-0"
                            value={filters.marca}
                            onChange={handleChange}
                        >
                            <option value="">Selecionar</option>
                            <option>Zara</option>
                            <option>H&M</option>
                            <option>Nike</option>
                            <option>Adidas</option>
                            <option>Puma</option>
                            <option>Gucci</option>
                            <option>Louis Vuitton</option>
                            <option>Calvin Klein</option>
                            <option>Tommy Hilfiger</option>
                            <option>Kappa</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label text-primary small">
                            Tamanho
                        </label>
                        <select
                            name="tamanho"
                            className="form-select border-0"
                            value={filters.tamanho}
                            onChange={handleChange}
                        >
                            <option value="">Selecionar</option>
                            <option>PP</option>
                            <option>P</option>
                            <option>M</option>
                            <option>G</option>
                            <option>GG</option>
                            <option>XG</option>
                            <option>XXG</option>
                        </select>
                    </div>

                    <button
                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "48px", height: "48px" }}
                        onClick={handleSearch}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </section>
    );
}
