import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../components/Header.css";
import "../styles/styles.css";
import logo from "../assets/Stand-Oline_logo_Black-removebg-preview.png";

export function Header() {
    return (
        <header className="custom-header">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <img src={logo} alt="Stand Online" />
                </div>
                <div className="nav-icons">
                    <a href="#" className="nav-item">
                        <i className="bi bi-list-ul"></i> Viaturas
                    </a>
                    <a href="#" className="nav-item">
                        <i className="bi bi-search"></i> Pesquisar
                    </a>
                    <a href="#" className="nav-item">
                        <i className="bi bi-gear"></i> Serviços
                    </a>
                    <a href="#" className="nav-item active">
                        <i className="bi bi-chat-dots"></i> Contactos
                    </a>
                    <a href="#" className="nav-item">
                        <i className="bi bi-grid-3x3-gap-fill"></i> Menu
                    </a>
                    <a href="/admin/featured-cars" class="nav-item admin-link ms-5 m-4">
                        <i class="bi bi-person-gear"></i> Admin
                    </a>
                </div>
            </div>
        </header>
    );
}

const AdminFeaturedCars = () => {
  const [car, setCar] = useState({
    marca: '',
    modelo: '',
    ano: '',
    combustivel: '',
    km: '',
    preco: '',
    imagem: '',
    ivaDedutivel: false,
  });

  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cars');
      setCars(res.data);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setCar({ ...car, [name]: checked });
    } else if (type === 'file') {
      setCar({ ...car, imagem: files[0] }); // pega o arquivo para upload real
    } else {
      setCar({ ...car, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('marca', car.marca);
    formData.append('modelo', car.modelo);
    formData.append('ano', car.ano);
    formData.append('combustivel', car.combustivel);
    formData.append('km', car.km);
    formData.append('preco', car.preco);
    formData.append('ivaDedutivel', car.ivaDedutivel);
    if (car.imagem) {
      formData.append('imagem', car.imagem);
    }

    try {
      await axios.post('http://localhost:5000/api/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchCars();

      setCar({
        marca: '',
        modelo: '',
        ano: '',
        combustivel: '',
        km: '',
        preco: '',
        imagem: '',
        ivaDedutivel: false,
      });
    } catch (error) {
      console.error('Erro ao adicionar carro:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      fetchCars();
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Adicionar Carro em Destaque</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        {[ 
          { label: 'Marca', name: 'marca', type: 'text' },
          { label: 'Modelo', name: 'modelo', type: 'text' },
          { label: 'Ano', name: 'ano', type: 'number' },
          { label: 'Combustível', name: 'combustivel', type: 'text' },
          { label: 'Quilometragem', name: 'km', type: 'number' },
          { label: 'Preço', name: 'preco', type: 'number' },
        ].map(({ label, name, type }) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              className="form-control"
              name={name}
              value={car[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Imagem</label>
          <input
            type="file"
            className="form-control"
            name="imagem"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="ivaDedutivel"
            checked={car.ivaDedutivel}
            onChange={handleChange}
          />
          <label className="form-check-label">IVA Dedutível</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Adicionar Carro</button>
      </form>

      <hr className="my-5" />

      <h3 className="text-center mb-4">Carros Adicionados</h3>
      <div className="row">
        {cars.map((c) => (
          <div className="col-md-4 mb-4" key={c._id}>
            <div className="card h-100">
              {c.imagem && (
                <img
                  src={`http://localhost:5000${c.imagem}`}
                  className="card-img-top"
                  alt={`${c.marca} ${c.modelo}`}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{c.marca} {c.modelo}</h5>
                <p className="card-text">
                  Ano: {c.ano} <br />
                  Combustível: {c.combustivel} <br />
                  Km: {c.km} <br />
                  Preço: €{c.preco} <br />
                  IVA Dedutível: {c.ivaDedutivel ? 'Sim' : 'Não'}
                </p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning w-100"
                    onClick={() => navigate(`/admin/editar-carro/${c._id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => handleDelete(c._id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeaturedCars;
