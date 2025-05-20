import "./Header.css";
import "../styles/styles.css";
import logo from "../assets/Stand-Oline_logo_Black-removebg-preview.png";

export default function Header() {
    return (
        <header className="custom-header">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <img src={logo} alt="Stand Online" />
                </div>
                <div className="nav-icons">
                    <a href="/viaturas" className="nav-item">
                        <i className="bi bi-list-ul"></i> Veiculos
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
                    <a
                        href="/admin/featured-cars"
                        className="nav-item admin-link ms-5 m-4"
                    >
                        <i className="bi bi-person-gear"></i> Admin
                    </a>
                </div>
            </div>
        </header>
    );
}
