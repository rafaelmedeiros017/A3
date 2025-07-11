import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Eventos = () => {
  const { token, user } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [carros, setCarros] = useState([]);
  const [motoristas, setMotoristas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('emprestimo'); // 'emprestimo' ou 'devolucao'
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    motorista_id: '',
    carro_id: '',
    odometro: '',
    observacoes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventosRes, carrosRes, motoristasRes] = await Promise.all([
        fetch('http://localhost:5000/api/eventos', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch('http://localhost:5000/api/cars', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch('http://localhost:5000/api/motoristas/ativos', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      ]);

      if (eventosRes.ok) {
        const eventosData = await eventosRes.json();
        setEventos(eventosData);
      }

      if (carrosRes.ok) {
        const carrosData = await carrosRes.json();
        setCarros(carrosData);
      }

      if (motoristasRes.ok) {
        const motoristasData = await motoristasRes.json();
        setMotoristas(motoristasData);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = modalType === 'emprestimo' 
        ? 'http://localhost:5000/api/eventos/emprestar'
        : 'http://localhost:5000/api/eventos/devolver';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          gestor_id: user.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.mensagem);
        setShowModal(false);
        resetForm();
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao processar evento:', error);
      setMessage('Erro de conexão');
    }
  };

  const resetForm = () => {
    setFormData({
      motorista_id: '',
      carro_id: '',
      odometro: '',
      observacoes: ''
    });
  };

  const openModal = (type) => {
    setModalType(type);
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getTipoEventoBadge = (tipo) => {
    const config = tipo === 'saida' 
      ? { class: 'bg-warning', text: 'Saída', icon: 'bi-arrow-up-circle' }
      : { class: 'bg-success', text: 'Entrada', icon: 'bi-arrow-down-circle' };
    
    return (
      <span className={`badge ${config.class}`}>
        <i className={`bi ${config.icon} me-1`}></i>
        {config.text}
      </span>
    );
  };

  const getCarrosDisponiveis = () => {
    return carros.filter(carro => carro.status === 'disponivel');
  };

  const getCarrosEmUso = () => {
    return carros.filter(carro => carro.status === 'em_uso');
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
    <div className="eventos">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestão de Eventos</h2>
        <div>
          <button 
            onClick={() => openModal('emprestimo')} 
            className="btn btn-warning me-2"
            disabled={getCarrosDisponiveis().length === 0}
          >
            <i className="bi bi-arrow-up-circle me-2"></i>
            Emprestar Carro
          </button>
          <button 
            onClick={() => openModal('devolucao')} 
            className="btn btn-success"
            disabled={getCarrosEmUso().length === 0}
          >
            <i className="bi bi-arrow-down-circle me-2"></i>
            Devolver Carro
          </button>
        </div>
      </div>

      {message && (
        <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      {/* Cards de Resumo */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total de Eventos</h5>
              <h3>{eventos.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Carros Disponíveis</h5>
              <h3>{getCarrosDisponiveis().length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Carros em Uso</h5>
              <h3>{getCarrosEmUso().length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Motoristas Ativos</h5>
              <h3>{motoristas.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Histórico de Eventos</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Data/Hora</th>
                  <th>Tipo</th>
                  <th>Motorista</th>
                  <th>Carro</th>
                  <th>Odômetro</th>
                  <th>Gestor</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody>
                {eventos.map((evento) => (
                  <tr key={evento.id}>
                    <td>{formatDate(evento.data_hora)}</td>
                    <td>{getTipoEventoBadge(evento.tipo_evento)}</td>
                    <td>
                      <strong>{evento.motorista_nome}</strong><br/>
                      <small className="text-muted">{evento.motorista_telefone}</small>
                    </td>
                    <td>
                      <strong>{evento.placa}</strong><br/>
                      <small className="text-muted">{evento.marca} {evento.modelo}</small>
                    </td>
                    <td>{Number(evento.odometro).toLocaleString()} km</td>
                    <td>{evento.gestor_nome}</td>
                    <td>{evento.observacoes || '-'}</td>
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
                {modalType === 'emprestimo' ? 'Emprestar Carro' : 'Devolver Carro'}
              </h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="motorista_id">Motorista *</label>
                      <select
                        id="motorista_id"
                        className="form-control"
                        value={formData.motorista_id}
                        onChange={(e) => setFormData({...formData, motorista_id: e.target.value})}
                        required
                      >
                        <option value="">Selecione um motorista</option>
                        {motoristas.map((motorista) => (
                          <option key={motorista.id} value={motorista.id}>
                            {motorista.nome} - {motorista.cpf}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="carro_id">Carro *</label>
                      <select
                        id="carro_id"
                        className="form-control"
                        value={formData.carro_id}
                        onChange={(e) => setFormData({...formData, carro_id: e.target.value})}
                        required
                      >
                        <option value="">Selecione um carro</option>
                        {(modalType === 'emprestimo' ? getCarrosDisponiveis() : getCarrosEmUso()).map((carro) => (
                          <option key={carro.id} value={carro.id}>
                            {carro.placa} - {carro.marca} {carro.modelo} ({carro.cor})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="odometro">Odômetro (km) *</label>
                      <input
                        type="number"
                        id="odometro"
                        className="form-control"
                        value={formData.odometro}
                        onChange={(e) => setFormData({...formData, odometro: e.target.value})}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="observacoes">Observações</label>
                      <textarea
                        id="observacoes"
                        className="form-control"
                        value={formData.observacoes}
                        onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                        rows="3"
                        placeholder="Observações sobre o evento..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className={`btn ${modalType === 'emprestimo' ? 'btn-warning' : 'btn-success'}`}>
                  {modalType === 'emprestimo' ? 'Emprestar' : 'Devolver'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos; 