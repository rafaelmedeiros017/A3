import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>🚗 Gestão de Frota</h3>
          <p className="user-info">
            <i className="bi bi-person-circle"></i>
            {user?.nome}
          </p>
        </div>
        
        <ul className="nav-menu">
          <li className={`nav-item ${isActive('/')}`}>
            <Link to="/" className="nav-link">
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </Link>
          </li>
          <li className={`nav-item ${isActive('/gestores')}`}>
            <Link to="/gestores" className="nav-link">
              <i className="bi bi-people"></i>
              Gestores
            </Link>
          </li>
          <li className={`nav-item ${isActive('/motoristas')}`}>
            <Link to="/motoristas" className="nav-link">
              <i className="bi bi-person-badge"></i>
              Motoristas
            </Link>
          </li>
          <li className={`nav-item ${isActive('/carros')}`}>
            <Link to="/carros" className="nav-link">
              <i className="bi bi-car-front"></i>
              Carros
            </Link>
          </li>
          <li className={`nav-item ${isActive('/eventos')}`}>
            <Link to="/eventos" className="nav-link">
              <i className="bi bi-calendar-event"></i>
              Eventos
            </Link>
          </li>
          <li className={`nav-item ${isActive('/relatorios')}`}>
            <Link to="/relatorios" className="nav-link">
              <i className="bi bi-graph-up"></i>
              Relatórios
            </Link>
          </li>
        </ul>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn btn-outline-danger w-100">
            <i className="bi bi-box-arrow-right"></i>
            Sair
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-content">
            <h1 className="page-title">
              {location.pathname === '/' && 'Dashboard'}
              {location.pathname === '/gestores' && 'Gestores'}
              {location.pathname === '/motoristas' && 'Motoristas'}
              {location.pathname === '/carros' && 'Carros'}
              {location.pathname === '/eventos' && 'Eventos'}
              {location.pathname === '/relatorios' && 'Relatórios'}
            </h1>
            <div className="header-actions">
              <span className="user-name">{user?.nome}</span>
            </div>
          </div>
        </header>
        
        <div className="content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
