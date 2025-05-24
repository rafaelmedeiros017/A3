import "./Header.css";
import "../styles/styles.css";
import logo from "../assets/Stand-Oline_logo_Black-removebg-preview.png";
import { useEffect, useState } from "react";

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <header className="custom-header">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo d-flex align-items-center">
                    <img src={logo} alt="Stand Online" />
                    {user && (
                        <span
                            style={{
                                fontSize: "1.3rem",
                                color: "#0d6efd",
                                marginLeft: "15px",
                            }}
                        >
                            Olá, {user.nome}
                        </span>
                    )}
                </div>

                <div className="nav-icons d-flex align-items-center">
                    <a href="/viaturas" className="nav-item">
                        <i className="bi bi-list-ul"></i> Veículos
                    </a>
                    <a href="/localizacao" className="nav-item">
                        <i className="bi bi-geo-alt-fill"></i> Localização
                    </a>
                    <a href="/contact" className="nav-item">
                        <i className="bi bi-chat-dots"></i> Contatos
                    </a>
                    <a href="/" className="nav-item">
                        <i className="bi bi-grid-3x3-gap-fill"></i> Menu
                    </a>

                    {user ? (
                        <>
                            <a
                                href="/admin/featured-cars"
                                className="nav-item ms-4 text-primary fw-bold"
                            >
                                <i className="bi bi-person-gear"></i> Admin
                            </a>
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger btn-sm ms-3"
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <a
                            href="/login"
                            className="btn btn-outline-primary btn-sm ms-4"
                        >
                            Entrar
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
}
