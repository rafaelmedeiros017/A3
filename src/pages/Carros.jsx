import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Carros = () => {
  const { token } = useAuth();
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCarro, setEditingCarro] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    cor: '',
    combustivel: '',
    odometro_atual: '',
    status: 'disponivel'
  });

  useEffect(() => {
    fetchCarros();
  }, []);

  const fetchCarros = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cars', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCarros(data);
      }
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingCarro 
        ? `http://localhost:5000/api/cars/${editingCarro.id}`
        : 'http://localhost:5000/api/cars';
      
      const method = editingCarro ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.mensagem);
        setShowModal(false);
        resetForm();
        fetchCarros();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao salvar carro:', error);
      setMessage('Erro de conexão');
    }
  };

  const handleEdit = (carro) => {
    setEditingCarro(carro);
    setFormData({
      placa: carro.placa,
      marca: carro.marca,
      modelo: carro.modelo,
      ano: carro.ano,
      cor: carro.cor,
      combustivel: carro.combustivel,
      odometro_atual: carro.odometro_atual,
      status: carro.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este carro?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage('Carro deletado com sucesso');
        fetchCarros();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
      setMessage('Erro ao deletar carro');
    }
  };

  const resetForm = () => {
    setFormData({
      placa: '',
      marca: '',
      modelo: '',
      ano: '',
      cor: '',
      combustivel: '',
      odometro_atual: '',
      status: 'disponivel'
    });
    setEditingCarro(null);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'disponivel': { class: 'bg-success', text: 'Disponível' },
      'em_uso': { class: 'bg-warning', text: 'Em Uso' },
      'manutencao': { class: 'bg-danger', text: 'Manutenção' }
    };
    
    const config = statusConfig[status] || { class: 'bg-secondary', text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="carros">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestão de Carros</h2>
        <button onClick={openModal} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Novo Carro
        </button>
      </div>

      {message && (
        <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Placa</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Ano</th>
                  <th>Cor</th>
                  <th>Combustível</th>
                  <th>Odômetro</th>
                  <th>Status</th>
                  <th>Motorista Atual</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carros.map((carro) => (
                  <tr key={carro.id}>
                    <td><strong>{carro.placa}</strong></td>
                    <td>{carro.marca}</td>
                    <td>{carro.modelo}</td>
                    <td>{carro.ano}</td>
                    <td>{carro.cor}</td>
                    <td>{carro.combustivel}</td>
                    <td>{Number(carro.odometro_atual).toLocaleString()} km</td>
                    <td>{getStatusBadge(carro.status)}</td>
                    <td>{carro.motorista_nome || '-'}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(carro)}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(carro.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editingCarro ? 'Editar Carro' : 'Novo Carro'}
              </h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="placa">Placa *</label>
                      <input
                        type="text"
                        id="placa"
                        className="form-control"
                        value={formData.placa}
                        onChange={(e) => setFormData({...formData, placa: e.target.value})}
                        required
                        maxLength="10"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="marca">Marca *</label>
                      <input
                        type="text"
                        id="marca"
                        className="form-control"
                        value={formData.marca}
                        onChange={(e) => setFormData({...formData, marca: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="modelo">Modelo *</label>
                      <input
                        type="text"
                        id="modelo"
                        className="form-control"
                        value={formData.modelo}
                        onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="ano">Ano *</label>
                      <input
                        type="number"
                        id="ano"
                        className="form-control"
                        value={formData.ano}
                        onChange={(e) => setFormData({...formData, ano: e.target.value})}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 1}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="cor">Cor *</label>
                      <input
                        type="text"
                        id="cor"
                        className="form-control"
                        value={formData.cor}
                        onChange={(e) => setFormData({...formData, cor: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="combustivel">Combustível *</label>
                      <select
                        id="combustivel"
                        className="form-control"
                        value={formData.combustivel}
                        onChange={(e) => setFormData({...formData, combustivel: e.target.value})}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="Gasolina">Gasolina</option>
                        <option value="Etanol">Etanol</option>
                        <option value="Flex">Flex</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Elétrico">Elétrico</option>
                        <option value="Híbrido">Híbrido</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="odometro_atual">Odômetro Atual (km) *</label>
                      <input
                        type="number"
                        id="odometro_atual"
                        className="form-control"
                        value={formData.odometro_atual}
                        onChange={(e) => setFormData({...formData, odometro_atual: e.target.value})}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  {editingCarro && (
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label htmlFor="status">Status</label>
                        <select
                          id="status"
                          className="form-control"
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                          <option value="disponivel">Disponível</option>
                          <option value="em_uso">Em Uso</option>
                          <option value="manutencao">Manutenção</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCarro ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carros; 