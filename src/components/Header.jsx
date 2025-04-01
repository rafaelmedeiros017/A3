import "./Header.css";
import "../styles/styles.css";
import logo from "../assets/Stand-Oline_logo_Black-removebg-preview.png";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="custom-header">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <img src={logo} alt="Stand Online" />
                </div>
                <div className="nav-icons">
                    <a href="#" className="nav-item">
                        <i className="bi bi-list-ul"></i> Viaturas
                    </a>
                    <a href="#" className="nav-item">
                        <i className="bi bi-search"></i> Pesquisar
                    </a>
                    <a href="#" className="nav-item">
                        <i className="bi bi-gear"></i> Serviços
                    </a>
                    <a href="#" className="nav-item active">
                        <i className="bi bi-chat-dots"></i> Contactos
                    </a>
                    <a href="#" className="nav-item">
                        <i className="bi bi-grid-3x3-gap-fill"></i> Menu
                    </a>
                    <a
                        href="/admin/featured-cars"
                        class="nav-item admin-link ms-5 m-4"
                    >
                        <i class="bi bi-person-gear"></i> Admin
                    </a>
                    <Link to="/login" className="nav-item login-button">
                        <i className="bi bi-box-arrow-in-right"></i> Logar
                    </Link>
                    <Link to="/registro" className="nav-item create-account">
                        <i className="bi bi-person-plus"></i> Registrar
                    </Link>
                </div>
            </div>
        </header>
    );
}
