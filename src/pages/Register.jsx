import "../styles/Registro.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        password: "",
        confirmarPassword: ""
    });

    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        if (formData.password !== formData.confirmarPassword) {
            setErro("As senhas não coincidem.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                nome: formData.nome,
                email: formData.email,
                password: formData.password
            });

            navigate("/login");
        } catch (err) {
            setErro(err.response?.data?.message || "Erro ao registrar.");
        }
    };

    return (
        <div className="registro-body">
            <form className="registro-form" onSubmit={handleSubmit}>
                <h1 className="mb-4">Criar Conta</h1>

                <input
                    type="text"
                    className="form-input mb-3"
                    placeholder="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    className="form-input mb-3"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    className="form-input mb-3"
                    placeholder="Senha"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    className="form-input mb-3"
                    placeholder="Confirmar Senha"
                    name="confirmarPassword"
                    value={formData.confirmarPassword}
                    onChange={handleChange}
                    required
                />

                {erro && <div className="erro-texto mb-2">{erro}</div>}

                <button type="submit" className="form-button">Criar Conta</button>

                <div className="mt-3">
                    <a href="/login" className="form-login-link">Já tem conta? Entrar</a>
                </div>
            </form>
        </div>
    );
};

export default Register;
