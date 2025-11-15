import "./Header.css";
import "../styles/styles.css";
import logo from "../assets/Stand-Oline_logo_Black-removebg-preview.png";

export default function Header() {
    return (
        <header className="custom-header">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <img src={logo} alt="Stand Online" />
<<<<<<< Updated upstream
                </div>
                <div className="nav-icons">
                    <a href="/viaturas" className="nav-item">
                        <i className="bi bi-list-ul"></i> Veiculos
=======
                    {user && (
                        <span
                            style={{
                                fontSize: "1.3rem",
                                color: "#0d6efd",
                                marginLeft: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            Olá, {user.nome}
                        </span>
                    )}
                </div>

                <div className="nav-icons d-flex align-items-center">
                    <a href="/roupas" className="nav-item">
                        <i className="bi bi-shop"></i> Roupas
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    <a
                        href="/admin/featured-cars"
                        className="nav-item admin-link ms-5 m-4"
                    >
                        <i className="bi bi-person-gear"></i> Admin
                    </a>
=======

                    {user ? (
                        <>
                            {user.isAdmin === 1 || user.isAdmin === true ? (
                                <a
                                    href="/admin/featured-roupas"
                                    className="nav-item ms-4 text-primary fw-bold"
                                >
                                    <i className="bi bi-person-gear"></i> Admin
                                </a>
                            ) : null}

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
>>>>>>> Stashed changes
                </div>
            </div>
        </header>
    );
}
