import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Relatorios = () => {
  const { token } = useAuth();
  const [relatorioUso, setRelatorioUso] = useState([]);
  const [eventosPorPeriodo, setEventosPorPeriodo] = useState([]);
  const [motoristas, setMotoristas] = useState([]);
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    motoristaId: '',
    carroId: ''
  });

  useEffect(() => {
    fetchDadosBasicos();
  }, []);

  const fetchDadosBasicos = async () => {
    try {
      const [motoristasRes, carrosRes] = await Promise.all([
        fetch('http://localhost:5000/api/motoristas/ativos', {
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
        })
      ]);

      if (motoristasRes.ok) {
        const motoristasData = await motoristasRes.json();
        setMotoristas(motoristasData);
      }

      if (carrosRes.ok) {
        const carrosData = await carrosRes.json();
        setCarros(carrosData);
      }
    } catch (error) {
      console.error('Erro ao buscar dados básicos:', error);
    }
  };

  const gerarRelatorioUso = async () => {
    if (!filtros.dataInicio || !filtros.dataFim) {
      setMessage('Selecione as datas de início e fim');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/eventos/relatorio/uso?dataInicio=${filtros.dataInicio}&dataFim=${filtros.dataFim}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRelatorioUso(data);
        setMessage('Relatório gerado com sucesso');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Erro ao gerar relatório');
      }
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      setMessage('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const buscarEventosPorPeriodo = async () => {
    if (!filtros.dataInicio || !filtros.dataFim) {
      setMessage('Selecione as datas de início e fim');
      return;
    }

    setLoading(true);
    try {
      let url = `http://localhost:5000/api/eventos/periodo?dataInicio=${filtros.dataInicio}&dataFim=${filtros.dataFim}`;
      
      if (filtros.motoristaId) {
        url = `http://localhost:5000/api/eventos/motorista/${filtros.motoristaId}?dataInicio=${filtros.dataInicio}&dataFim=${filtros.dataFim}`;
      } else if (filtros.carroId) {
        url = `http://localhost:5000/api/eventos/carro/${filtros.carroId}?dataInicio=${filtros.dataInicio}&dataFim=${filtros.dataFim}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEventosPorPeriodo(data);
        setMessage('Eventos carregados com sucesso');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Erro ao buscar eventos');
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      setMessage('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getTipoEventoBadge = (tipo) => {
    const config = tipo === 'saida' 
      ? { class: 'bg-warning', text: 'Saída' }
      : { class: 'bg-success', text: 'Entrada' };
    
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const limparFiltros = () => {
    setFiltros({
      dataInicio: '',
      dataFim: '',
      motoristaId: '',
      carroId: ''
    });
    setRelatorioUso([]);
    setEventosPorPeriodo([]);
  };

  return (
    <div className="relatorios">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Relatórios e Análises</h2>
      </div>

      {message && (
        <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filtros</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group mb-3">
                <label htmlFor="dataInicio">Data Início</label>
                <input
                  type="date"
                  id="dataInicio"
                  className="form-control"
                  value={filtros.dataInicio}
                  onChange={(e) => setFiltros({...filtros, dataInicio: e.target.value})}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mb-3">
                <label htmlFor="dataFim">Data Fim</label>
                <input
                  type="date"
                  id="dataFim"
                  className="form-control"
                  value={filtros.dataFim}
                  onChange={(e) => setFiltros({...filtros, dataFim: e.target.value})}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mb-3">
                <label htmlFor="motoristaId">Motorista (Opcional)</label>
                <select
                  id="motoristaId"
                  className="form-control"
                  value={filtros.motoristaId}
                  onChange={(e) => setFiltros({...filtros, motoristaId: e.target.value, carroId: ''})}
                >
                  <option value="">Todos os motoristas</option>
                  {motoristas.map((motorista) => (
                    <option key={motorista.id} value={motorista.id}>
                      {motorista.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mb-3">
                <label htmlFor="carroId">Carro (Opcional)</label>
                <select
                  id="carroId"
                  className="form-control"
                  value={filtros.carroId}
                  onChange={(e) => setFiltros({...filtros, carroId: e.target.value, motoristaId: ''})}
                >
                  <option value="">Todos os carros</option>
                  {carros.map((carro) => (
                    <option key={carro.id} value={carro.id}>
                      {carro.placa} - {carro.marca} {carro.modelo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button
                onClick={gerarRelatorioUso}
                className="btn btn-primary me-2"
                disabled={loading}
              >
                <i className="bi bi-graph-up me-2"></i>
                Gerar Relatório de Uso
              </button>
              <button
                onClick={buscarEventosPorPeriodo}
                className="btn btn-info me-2"
                disabled={loading}
              >
                <i className="bi bi-calendar-event me-2"></i>
                Buscar Eventos
              </button>
              <button
                onClick={limparFiltros}
                className="btn btn-secondary"
                disabled={loading}
              >
                <i className="bi bi-x-circle me-2"></i>
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Relatório de Uso */}
      {relatorioUso.length > 0 && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Relatório de Uso de Veículos</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Marca/Modelo</th>
                    <th>Total Saídas</th>
                    <th>Total Entradas</th>
                    <th>KM Percorridos</th>
                  </tr>
                </thead>
                <tbody>
                  {relatorioUso.map((item, index) => (
                    <tr key={index}>
                      <td><strong>{item.placa}</strong></td>
                      <td>{item.marca} {item.modelo}</td>
                      <td>
                        <span className="badge bg-warning">{item.total_saidas || 0}</span>
                      </td>
                      <td>
                        <span className="badge bg-success">{item.total_entradas || 0}</span>
                      </td>
                      <td>
                        <strong>{Number(item.km_percorridos || 0).toLocaleString()} km</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Eventos por Período */}
      {eventosPorPeriodo.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              Eventos por Período
              {filtros.motoristaId && ` - ${motoristas.find(m => m.id == filtros.motoristaId)?.nome}`}
              {filtros.carroId && ` - ${carros.find(c => c.id == filtros.carroId)?.placa}`}
            </h5>
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
                  {eventosPorPeriodo.map((evento) => (
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
      )}

      {/* Estado vazio */}
      {!loading && relatorioUso.length === 0 && eventosPorPeriodo.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-graph-up fs-1 text-muted mb-3"></i>
          <h5 className="text-muted">Nenhum relatório gerado</h5>
          <p className="text-muted">Use os filtros acima para gerar relatórios e análises</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-3">Gerando relatório...</p>
        </div>
      )}
    </div>
  );
};

export default Relatorios; 