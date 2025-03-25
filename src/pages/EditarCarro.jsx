import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarCarro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    marca: '',
    modelo: '',
    ano: '',
    combustivel: '',
    km: '',
    preco: '',
    ivaDedutivel: false,
    imagem: '',
  });
  const [novaImagem, setNovaImagem] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      const res = await axios.get(`http://localhost:5000/api/cars`);
      const foundCar = res.data.find((carro) => carro._id === id);
      if (foundCar) {
        setCar(foundCar);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCar((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImagemChange = (e) => {
    setNovaImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("marca", car.marca);
    formData.append("modelo", car.modelo);
    formData.append("ano", car.ano);
    formData.append("combustivel", car.combustivel);
    formData.append("km", car.km);
    formData.append("preco", car.preco);
    formData.append("ivaDedutivel", car.ivaDedutivel);

    if (novaImagem) {
      formData.append("imagem", novaImagem);
    }

    try {
      await axios.put(`http://localhost:5000/api/cars/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin/featured-cars');
    } catch (err) {
      console.error("Erro ao editar carro:", err);
      alert("Erro ao editar carro.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Editar Carro</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        {[
          { label: 'Marca', name: 'marca' },
          { label: 'Modelo', name: 'modelo' },
          { label: 'Ano', name: 'ano', type: 'number' },
          { label: 'Combustível', name: 'combustivel' },
          { label: 'Quilometragem', name: 'km', type: 'number' },
          { label: 'Preço', name: 'preco', type: 'number' },
        ].map(({ label, name, type = 'text' }) => (
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
          <label className="form-label">Imagem (opcional)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImagemChange}
          />
          {car.imagem && (
            <div className="mt-2">
              <strong>Imagem atual:</strong><br />
              <img
                src={`http://localhost:5000/uploads/${car.imagem}`}
                alt="Imagem atual"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
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

        <button type="submit" className="btn btn-success w-100">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditarCarro;
