import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Sobre nós */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Stand Online</h5>
            <p className="small">
              A Stand Online oferece viaturas de qualidade, com atendimento personalizado e total
              transparência. Garantimos confiança e satisfação em cada negócio.
            </p>
          </div>

          {/* Contactos */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contactos</h5>
            <p className="mb-1">
              <i className="bi bi-telephone-fill me-2"></i> +351 912 345 678
            </p>
            <p className="mb-1">
              <i className="bi bi-envelope-fill me-2"></i> standonline@gmail.com
            </p>
            <p className="mb-1">
              <i className="bi bi-geo-alt-fill me-2"></i> Rua das Viaturas, nº 100, Lisboa
            </p>
          </div>

          {/* Redes Sociais */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Siga-nos</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-light fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center small mb-0">
          &copy; {new Date().getFullYear()} Stand Online. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
