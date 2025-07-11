import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Motoristas = () => {
  const { token } = useAuth();
  const [motoristas, setMotoristas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMotorista, setEditingMotorista] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    cnh: '',
    categoria_cnh: '',
    status: 'ativo'
  });

  useEffect(() => {
    fetchMotoristas();
  }, []);

  const fetchMotoristas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/motoristas', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMotoristas(data);
      }
    } catch (error) {
      console.error('Erro ao buscar motoristas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingMotorista 
        ? `http://localhost:5000/api/motoristas/${editingMotorista.id}`
        : 'http://localhost:5000/api/motoristas';
      
      const method = editingMotorista ? 'PUT' : 'POST';
      
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
        fetchMotoristas();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao salvar motorista:', error);
      setMessage('Erro de conexão');
    }
  };

  const handleEdit = (motorista) => {
    setEditingMotorista(motorista);
    setFormData({
      nome: motorista.nome,
      cpf: motorista.cpf,
      telefone: motorista.telefone,
      email: motorista.email || '',
      cnh: motorista.cnh,
      categoria_cnh: motorista.categoria_cnh,
      status: motorista.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este motorista?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/motoristas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage('Motorista deletado com sucesso');
        fetchMotoristas();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Erro ao deletar motorista:', error);
      setMessage('Erro ao deletar motorista');
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      cnh: '',
      categoria_cnh: '',
      status: 'ativo'
    });
    setEditingMotorista(null);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
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
    <div className="motoristas">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestão de Motoristas</h2>
        <button onClick={openModal} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Novo Motorista
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
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>CNH</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {motoristas.map((motorista) => (
                  <tr key={motorista.id}>
                    <td>{motorista.nome}</td>
                    <td>{motorista.cpf}</td>
                    <td>{motorista.telefone}</td>
                    <td>{motorista.email || '-'}</td>
                    <td>{motorista.cnh}</td>
                    <td>{motorista.categoria_cnh}</td>
                    <td>
                      <span className={`badge ${motorista.status === 'ativo' ? 'bg-success' : 'bg-danger'}`}>
                        {motorista.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(motorista)}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(motorista.id)}
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
                {editingMotorista ? 'Editar Motorista' : 'Novo Motorista'}
              </h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="nome">Nome *</label>
                      <input
                        type="text"
                        id="nome"
                        className="form-control"
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="cpf">CPF *</label>
                      <input
                        type="text"
                        id="cpf"
                        className="form-control"
                        value={formData.cpf}
                        onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="telefone">Telefone *</label>
                      <input
                        type="tel"
                        id="telefone"
                        className="form-control"
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="cnh">CNH *</label>
                      <input
                        type="text"
                        id="cnh"
                        className="form-control"
                        value={formData.cnh}
                        onChange={(e) => setFormData({...formData, cnh: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="categoria_cnh">Categoria CNH *</label>
                      <select
                        id="categoria_cnh"
                        className="form-control"
                        value={formData.categoria_cnh}
                        onChange={(e) => setFormData({...formData, categoria_cnh: e.target.value})}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="AB">AB</option>
                        <option value="AC">AC</option>
                        <option value="AD">AD</option>
                        <option value="AE">AE</option>
                      </select>
                    </div>
                  </div>
                </div>
                {editingMotorista && (
                  <div className="form-group mb-3">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      className="form-control"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMotorista ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Motoristas; 