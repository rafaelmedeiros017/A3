import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Resultados = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [carrosFiltrados, setCarrosFiltrados] = useState([]);

  const query = new URLSearchParams(location.search);
  const marca = query.get('marca') || '';
  const combustivel = query.get('combustivel') || '';

  const getFirstImage = (imagens) => {
    if (!imagens) return null;
    if (typeof imagens === 'string') {
      try {
        const parsed = JSON.parse(imagens);
        return Array.isArray(parsed) ? parsed[0] : parsed;
      } catch {
        return imagens;
      }
    }
    if (Array.isArray(imagens)) return imagens[0];
    return null;
  };

  const isIvaDedutivel = (value) => {
    return value === true || value === 'true' || value === 1 || value === '1';
  };

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cars');
        const todosOsCarros = res.data;

        const filtrados = todosOsCarros.filter((carro) => {
          return (
            (!marca || carro.marca.toLowerCase() === marca.toLowerCase()) &&
            (!combustivel || carro.combustivel.toLowerCase() === combustivel.toLowerCase())
          );
        });

        setCarrosFiltrados(filtrados);
      } catch (err) {
        console.error('Erro ao buscar carros filtrados:', err);
      }
    };

    fetchCarros();
  }, [marca, combustivel]);

  const handleClick = (carro) => {
    localStorage.setItem("carDetails", JSON.stringify(carro));
    navigate(`/carro/${carro.id}`);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-3">Resultados da Pesquisa</h2>

      {carrosFiltrados.length === 0 ? (
        <p className="text-center text-muted">Nenhum carro encontrado com os filtros selecionados.</p>
      ) : (
        <div className="row g-4">
          {carrosFiltrados.map((carro) => {
            const imagemPrincipal = getFirstImage(carro.imagens);
            return (
              <div
                className="col-md-6 col-lg-4"
                key={carro.id}
                onClick={() => handleClick(carro)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card shadow rounded-4 h-100 d-flex flex-column">
                  <div
                    className="position-relative"
                    style={{ height: '250px', overflow: 'hidden' }}
                  >
                    {isIvaDedutivel(carro.ivaDedutivel) && (
                      <span className="badge bg-primary position-absolute top-0 start-0 m-2">
                        IVA DEDUTÍVEL
                      </span>
                    )}
                    {imagemPrincipal && (
                      <img
                        src={`http://localhost:5000${imagemPrincipal}`}
                        alt={`${carro.marca} ${carro.modelo}`}
                        className="w-100 h-100 object-fit-cover rounded-top-4"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                      <h5 className="fw-bold">{carro.marca}</h5>
                      <p className="mb-2">{carro.modelo}</p>
                      <p className="mb-2">
                        <i className="bi bi-calendar me-1"></i> {carro.ano}
                        <i className="bi bi-fuel-pump ms-3 me-1"></i> {carro.combustivel}
                        <i className="bi bi-speedometer2 ms-3 me-1"></i> {Number(carro.km).toLocaleString()} km
                      </p>
                    </div>
                    <h5 className="text-primary fw-bold mt-auto">
                      {Number(carro.preco).toLocaleString("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 0,
                      })}
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Resultados;
