import React, { useState } from 'react';
import '../styles/Registro.css';
import Header from '../components/Header';

const CreateAccountModal = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        role: ''
    });

    const [emailValido, setEmailValido] = useState(true);

    const validarEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setFormData({ ...formData, email });
        setEmailValido(validarEmail(email));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailValido) {
            alert('Por favor, insira um email válido.');
            return;
        }
        if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            setFormData({ ...formData, senha: '', confirmarSenha: '' });
            return;
        }
        console.log('Formulário enviado com sucesso:', formData);
    };

    return (
        <div className="registro-body">
            <Header />

            <form className="registro-form" onSubmit={handleSubmit}>
                <h1 className="form-titulo">Registre-se</h1>
                <div className="form-grupo">
                    <input
                        type="text"
                        id="nome"
                        className="form-input"
                        placeholder="Nome (Ex: João)"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                </div>
                <div className="form-grupo">
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="Email (Ex: joao123@example.com)"
                        value={formData.email}
                        onChange={handleEmailChange}
                    />
                    {!emailValido && <p className="erro-texto">Email inválido</p>}
                </div>
                <div className="form-grupo">
                    <input
                        type="password"
                        id="senha"
                        className="form-input"
                        placeholder="Senha"
                        value={formData.senha}
                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    />
                </div>
                <div className="form-grupo">
                    <input
                        type="password"
                        id="confirmarSenha"
                        className="form-input"
                        placeholder="Confirmar Senha"
                        value={formData.confirmarSenha}
                        onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                    />
                </div>
                <div className="form-grupo">
                    <select
                        id="role"
                        className="form-select"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
            </form>
        </div>
    );
};

export default CreateAccountModal;
