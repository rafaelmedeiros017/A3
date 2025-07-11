import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalCarros: 0,
    carrosDisponiveis: 0,
    carrosEmUso: 0,
    totalMotoristas: 0,
    motoristasAtivos: 0,
    totalEventos: 0,
    eventosHoje: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Buscar estatísticas
      const [carrosRes, motoristasRes, eventosRes] = await Promise.all([
        fetch('http://localhost:5000/api/cars', { headers }),
        fetch('http://localhost:5000/api/motoristas', { headers }),
        fetch('http://localhost:5000/api/eventos', { headers })
      ]);

      const carros = await carrosRes.json();
      const motoristas = await motoristasRes.json();
      const eventos = await eventosRes.json();

      const carrosDisponiveis = carros.filter(c => c.status === 'disponivel').length;
      const carrosEmUso = carros.filter(c => c.status === 'em_uso').length;
      const motoristasAtivos = motoristas.filter(m => m.status === 'ativo').length;

      // Eventos de hoje
      const hoje = new Date().toISOString().split('T')[0];
      const eventosHoje = eventos.filter(e => 
        e.data_hora.startsWith(hoje)
      ).length;

      setStats({
        totalCarros: carros.length,
        carrosDisponiveis,
        carrosEmUso,
        totalMotoristas: motoristas.length,
        motoristasAtivos,
        totalEventos: eventos.length,
        eventosHoje
      });

      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Dashboard - Visão Geral</h2>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card stat-card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.totalCarros}</h3>
                  <p className="card-text">Total de Carros</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-car-front fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.carrosDisponiveis}</h3>
                  <p className="card-text">Carros Disponíveis</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-check-circle fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.carrosEmUso}</h3>
                  <p className="card-text">Carros em Uso</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-clock fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.totalMotoristas}</h3>
                  <p className="card-text">Total de Motoristas</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-person-badge fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda linha de cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card stat-card bg-secondary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.motoristasAtivos}</h3>
                  <p className="card-text">Motoristas Ativos</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-person-check fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card stat-card bg-dark text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.totalEventos}</h3>
                  <p className="card-text">Total de Eventos</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-calendar-event fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card stat-card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.eventosHoje}</h3>
                  <p className="card-text">Eventos Hoje</p>
                </div>
                <div className="stat-icon">
                  <i className="bi bi-calendar-day fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Ações Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <button className="btn btn-outline-primary w-100">
                    <i className="bi bi-plus-circle me-2"></i>
                    Novo Motorista
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-outline-success w-100">
                    <i className="bi bi-car-front me-2"></i>
                    Novo Carro
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-outline-warning w-100">
                    <i className="bi bi-arrow-up-circle me-2"></i>
                    Emprestar Carro
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-outline-info w-100">
                    <i className="bi bi-graph-up me-2"></i>
                    Ver Relatórios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 