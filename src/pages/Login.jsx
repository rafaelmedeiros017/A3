import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Loginpage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  
  // Campos para registro
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senhaConfirm, setSenhaConfirm] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await login(email, senha);
    
    if (result.success) {
      navigate('/');
    } else {
      setMessage(result.message);
    }
    
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (senha !== senhaConfirm) {
      setMessage('As senhas não coincidem');
      setLoading(false);
      return;
    }

    const result = await register(nome, email, senha, telefone);
    
    if (result.success) {
      setMessage(result.message);
      setShowRegister(false);
      // Limpar campos
      setNome('');
      setEmail('');
      setSenha('');
      setSenhaConfirm('');
      setTelefone('');
    } else {
      setMessage(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>🚗 Sistema de Gestão de Frota</h2>
          <p>Faça login para acessar o sistema</p>
        </div>

        {message && (
          <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        {!showRegister ? (
          // Formulário de Login
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                placeholder="Digite seu email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="form-control"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <div className="text-center mt-3">
              <button
                type="button"
                onClick={() => setShowRegister(true)}
                className="btn btn-link"
              >
                Não tem uma conta? Registre-se
              </button>
            </div>
          </form>
        ) : (
          // Formulário de Registro
          <form onSubmit={handleRegister} className="login-form">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="form-control"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                placeholder="Digite seu email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                className="form-control"
                placeholder="Digite seu telefone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="form-control"
                placeholder="Digite sua senha"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senhaConfirm">Confirmar Senha</label>
              <input
                type="password"
                id="senhaConfirm"
                value={senhaConfirm}
                onChange={(e) => setSenhaConfirm(e.target.value)}
                required
                className="form-control"
                placeholder="Confirme sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>

            <div className="text-center mt-3">
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                className="btn btn-link"
              >
                Já tem uma conta? Faça login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
