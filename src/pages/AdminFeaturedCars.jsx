import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminFeaturedCars = () => {
  const [car, setCar] = useState({
    marca: '',
    modelo: '',
    ano: '',
    combustivel: '',
    km: '',
    preco: '',
    registo: '',
    lugares: '',
    segmento: '',
    potencia: '',
    origem: '',
    cilindrada: '',
    transmissao: '',
    cor: '',
    portas: '',
    estado: '',
    garantia: '',
    imagens: [],
    ivaDedutivel: false,
    informacoesAdicionais: [],
  });

  const [cars, setCars] = useState([]);
  const [autorizado, setAutorizado] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const jaVerificado = useRef(false);

  useEffect(() => {
    if (!jaVerificado.current) {
      jaVerificado.current = true;
      const senha = prompt('Digite a senha para acessar a página de administração:');
      if (senha === '1234') {
        setAutorizado(true);
        fetchCars();
      } else {
        alert('Senha incorreta!');
        navigate('/');
      }
    }
  }, [navigate]);

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
      setCar({ ...car, imagens: Array.from(files) });
    } else {
      setCar({ ...car, [name]: value });
    }
  };

  const handleAddInfo = () => {
    setCar({ ...car, informacoesAdicionais: [...car.informacoesAdicionais, ''] });
  };

  const handleRemoveInfo = (index) => {
    const novasInfos = car.informacoesAdicionais.filter((_, i) => i !== index);
    setCar({ ...car, informacoesAdicionais: novasInfos });
  };

  const handleChangeInfo = (index, value) => {
    const novasInfos = [...car.informacoesAdicionais];
    novasInfos[index] = value;
    setCar({ ...car, informacoesAdicionais: novasInfos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(car).forEach(([key, val]) => {
      if (key === 'imagens') {
        val.forEach((img) => formData.append('imagens', img));
      } else if (key === 'informacoesAdicionais') {
        formData.append('informacoesAdicionais', JSON.stringify(val));
      } else {
        formData.append(key, val);
      }
    });

    try {
      await axios.post('http://localhost:5000/api/cars', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      fetchCars();

      setCar({
        marca: '',
        modelo: '',
        ano: '',
        combustivel: '',
        km: '',
        preco: '',
        registo: '',
        lugares: '',
        segmento: '',
        potencia: '',
        origem: '',
        cilindrada: '',
        transmissao: '',
        cor: '',
        portas: '',
        estado: '',
        garantia: '',
        imagens: [],
        ivaDedutivel: false,
        informacoesAdicionais: [],
      });
    } catch (error) {
      console.error('Erro ao adicionar carro:', error);
    } finally {
      setLoading(false);
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

  const handleDevolver = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/cars/devolver/${id}`);
      fetchCars();
    } catch (error) {
      console.error('Erro ao devolver carro:', error);
    }
  };

  if (!autorizado) return null;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Adicionar Carro em Destaque</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '900px' }}>
        <div className="row">
          {[
            { label: 'Marca', name: 'marca', type: 'text' },
            { label: 'Modelo', name: 'modelo', type: 'text' },
            { label: 'Ano', name: 'ano', type: 'number' },
            { label: 'Combustível', name: 'combustivel', type: 'text' },
            { label: 'Quilometragem', name: 'km', type: 'number' },
            { label: 'Preço', name: 'preco', type: 'number' },
            { label: 'Registo', name: 'registo', type: 'text' },
            { label: 'Lugares', name: 'lugares', type: 'number' },
            { label: 'Segmento', name: 'segmento', type: 'text' },
            { label: 'Potência', name: 'potencia', type: 'text' },
            { label: 'Origem', name: 'origem', type: 'text' },
            { label: 'Cilindrada', name: 'cilindrada', type: 'text' },
            { label: 'Transmissão', name: 'transmissao', type: 'text' },
            { label: 'Cor', name: 'cor', type: 'text' },
            { label: 'Portas', name: 'portas', type: 'number' },
            { label: 'Estado', name: 'estado', type: 'text' },
            { label: 'Garantia', name: 'garantia', type: 'text' },
          ].map(({ label, name, type }) => (
            <div className="col-md-6 mb-3" key={name}>
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

          <div className="col-12 mb-3">
            <label className="form-label">Imagens</label>
            <input
              type="file"
              className="form-control"
              name="imagens"
              onChange={handleChange}
              accept="image/*"
              multiple
              required
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Informações Adicionais</label>
            {car.informacoesAdicionais.map((info, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={info}
                  onChange={(e) => handleChangeInfo(index, e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveInfo(index)}
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddInfo}
            >
              Adicionar Informação
            </button>
          </div>

          <div className="col-12 mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="ivaDedutivel"
              checked={car.ivaDedutivel}
              onChange={handleChange}
            />
            <label className="form-check-label">IVA Dedutível</label>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Adicionando...' : 'Adicionar Carro'}
            </button>
          </div>
        </div>
      </form>

      <hr className="my-5" />

      <h3 className="text-center mb-4">Carros Adicionados</h3>
      <div className="row">
        {cars.map((c) => {
          const imagens = Array.isArray(c.imagens) ? c.imagens : [c.imagens];
          const infoAdic = Array.isArray(c.informacoesAdicionais) ? c.informacoesAdicionais : [];

          return (
            <div className="col-md-6 mb-4" key={c.id}>
              <div className="card h-100 shadow-sm">
                {imagens.length > 0 && (
                  <Carousel indicators={false} controls={imagens.length > 1}>
                    {imagens.map((imgPath, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={`http://localhost:5000${imgPath}`}
                          className="d-block w-100"
                          alt={`${c.marca} ${c.modelo} imagem ${index + 1}`}
                          style={{ height: '250px', objectFit: 'cover' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
                <div className="card-body">
                  <h5 className="card-title">{c.marca} {c.modelo}</h5>
                  <p className="card-text">
                    Ano: {c.ano}<br />
                    Combustível: {c.combustivel}<br />
                    Km: {c.km}<br />
                    Preço: €{c.preco}<br />
                    IVA Dedutível: {c.ivaDedutivel === 1 || c.ivaDedutivel === true ? 'Sim' : 'Não'}<br />
                    <strong>Status:</strong>{' '}
                    {c.alugado === 1 ? (
                      <span className="text-danger fw-bold">Alugado</span>
                    ) : (
                      <span className="text-success fw-bold">Disponível</span>
                    )}
                  </p>

                  {c.alugado === 1 && (
                    <div className="my-2">
                      <span className="badge bg-success fs-5">
                        Alugado por: <strong>{c.alugadoPor || 'Desconhecido'}</strong>
                      </span>
                      <div className="mt-2">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDevolver(c.id)}
                        >
                          Devolver
                        </button>
                      </div>
                    </div>
                  )}

                  {infoAdic.length > 0 && (
                    <ul>
                      {infoAdic.map((info, i) => (
                        <li key={i}>{info}</li>
                      ))}
                    </ul>
                  )}

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning w-100"
                      onClick={() => navigate(`/admin/editar-carro/${c.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDelete(c.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminFeaturedCars;
