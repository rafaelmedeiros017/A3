import "../styles/Loginpage.css";

const Login = () => {
    return (

            <div className="login-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div className="login-container">
                    <h1 className="mb-4">Login</h1>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Usuário"
                    />
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Senha"
                    />
                    <button className="btn btn-primary w-100 mb-3">Entrar</button>
                    <p>Ou entre com</p>
                    <div className="social-buttons">
                        <button className="btn btn-outline-dark w-100 mb-2">
                            <i className="fab fa-google me-2"></i> Entrar com Google
                        </button>
                        <button className="btn btn-outline-dark w-100">
                            <i className="fab fa-facebook-f me-2"></i> Entrar com
                            Facebook
                        </button>
                    </div>
                    <a className="criar-conta" href="/Registro">
                        <p>Criar conta</p>
                    </a>
                </div>
            </div>
    );
};

export default Login;
