import React, { useState } from 'react';
import '../styles/Registro.css';

const CreateAccountModal = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            setFormData({ ...formData, senha: '', confirmarSenha: '' });
            return;
        }
        // Aqui da pra adicionar a lógica para enviar os dados do formulário
        console.log('Formulário enviado com sucesso:', formData);
    };

    return (
        <div className="registro-body">
            <form className="registro-form" onSubmit={handleSubmit}>
                <h1 className="form-titulo">Registre-se</h1>
                <div className="form-group">
                    <label htmlFor="nome" className="form-label"></label>
                    <input
                        type="text"
                        id="nome"
                        className="form-input"
                        placeholder="Nome (Ex: João)"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label"></label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="Email (Ex: joao123@example.com)"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onBlur={() => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(formData.email)) {
                                alert('Por favor, insira um email válido.');
                            }
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha" className="form-label"></label>
                    <input
                        type="password"
                        id="senha"
                        className="form-input"
                        placeholder="Senha"
                        value={formData.senha}
                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmarSenha" className="form-label"></label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        className="form-input"
                        placeholder="Confirmar Senha"
                        value={formData.confirmarSenha}
                        onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role" className="form-label"></label>
                    <select
                        id="role"
                        className="form-select"
                        placeholder="Escolha uma opção"
                        value={formData.role || ''}
                        onChange={(e) => setFormData(formData => ({ ...formData, role: e.target.value }))}
                    >
                        <option value="" disabled>Escolha seu intúito</option>
                        <option value="aluga">Locador</option>
                        <option value="alugara">Locatário</option>
                    </select>
                </div>
                <button type="submit" className="form-button">Criar Conta</button>
                <p className="form-terms">
                    Ao criar uma conta, você concorda com nossos <a href="/termos">Termos de Serviço</a> e <a href="/privacidade">Política de Privacidade</a>.
                </p>
                <a href="/Login" className="form-login-link">
                    <p>Já possui uma conta? Faça login</p>
                </a>
                <button type="button" className="google-login-button" onClick={() => alert('Login com Google ainda não implementado.')}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                        alt="Google Logo"
                        className="google-logo"
                    />
                    
                </button>
            </form>
        </div>
    );
};

export default CreateAccountModal;