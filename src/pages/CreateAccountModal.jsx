import React, { useState } from 'react';
import '../styles/registro.css';


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
            return;
        }
        // Aqui você pode adicionar a lógica para enviar os dados do formulário
        console.log('Conta criada com sucesso!', formData);
    };

    return (
        <div className="registro-container">
            <h2 className="registro-title">Criar Conta</h2>
            <form className="registro-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        className="form-input"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha" className="form-label">Senha</label>
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
                    <label htmlFor="confirmarSenha" className="form-label">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        className="form-input"
                        placeholder="Confirmar Senha"
                        value={formData.confirmarSenha}
                        onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                    />
                </div>
                <button type="submit" className="form-button">Criar Conta</button>
            </form>
        </div>
    );
};
    
    
export default CreateAccountModal;