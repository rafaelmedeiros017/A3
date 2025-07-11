import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Gestores = () => {
  const { token } = useAuth();
  const [gestores, setGestores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGestor, setEditingGestor] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  useEffect(() => {
    fetchGestores();
  }, []);

  const fetchGestores = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/gestores', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setGestores(data);
      }
    } catch (error) {
      console.error('Erro ao buscar gestores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingGestor 
        ? `http://localhost:5000/api/gestores/${editingGestor.id}`
        : 'http://localhost:5000/api/gestores';
      
      const method = editingGestor ? 'PUT' : 'POST';
      
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
        fetchGestores();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao salvar gestor:', error);
      setMessage('Erro de conexão');
    }
  };

  const handleEdit = (gestor) => {
    setEditingGestor(gestor);
    setFormData({
      nome: gestor.nome,
      email: gestor.email,
      telefone: gestor.telefone || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este gestor?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/gestores/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage('Gestor deletado com sucesso');
        fetchGestores();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Erro ao deletar gestor:', error);
      setMessage('Erro ao deletar gestor');
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: ''
    });
    setEditingGestor(null);
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
    <div className="gestores">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestão de Gestores</h2>
        <button onClick={openModal} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Novo Gestor
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
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Data de Criação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {gestores.map((gestor) => (
                  <tr key={gestor.id}>
                    <td><strong>{gestor.nome}</strong></td>
                    <td>{gestor.email}</td>
                    <td>{gestor.telefone || '-'}</td>
                    <td>{new Date(gestor.created_at).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(gestor)}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(gestor.id)}
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
                {editingGestor ? 'Editar Gestor' : 'Novo Gestor'}
              </h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
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
                <div className="form-group mb-3">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    className="form-control"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>
                {!editingGestor && (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Nota:</strong> A senha será definida pelo próprio gestor no primeiro acesso.
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingGestor ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gestores; 