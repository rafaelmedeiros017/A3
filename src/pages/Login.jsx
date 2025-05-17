import "../styles/Loginpage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        } catch (err) {
            setErro(err.response?.data?.message || "Erro ao fazer login.");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1 className="mb-4">Login</h1>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {erro && <div className="alert alert-danger mb-3">{erro}</div>}

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Entrar
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p>Não tem conta?</p>
                    <Link to="/register" className="btn btn-outline-primary w-100">
                        Criar Conta
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
