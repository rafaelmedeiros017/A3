import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Header />
      <section className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h2 className="fw-bold">Como você prefere falar com a gente?</h2>
          <p className="lead">Estamos aqui para ajudar da forma mais conveniente para você.</p>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="row text-center g-4">
            {/* Email */}
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow h-100">
                <i className="bi bi-envelope fs-1 text-primary mb-3"></i>
                <h5 className="fw-bold mb-2">E-mail</h5>
                <p className="text-muted">Tem alguma dúvida?</p>
                <p className="fw-semibold">standonline@email.com</p>
              </div>
            </div>

            {/* Telefone */}
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow h-100">
                <i className="bi bi-telephone-fill fs-1 text-primary mb-3"></i>
                <h5 className="fw-bold mb-2">Telefone</h5>
                <p className="text-muted">Pode ligar a qualquer hora.</p>
                <p className="fw-semibold">+351 912 345 678</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="col-md-4">
              <div className="p-4 bg-white rounded shadow h-100">
                <i className="bi bi-whatsapp fs-1 text-success mb-3"></i>
                <h5 className="fw-bold mb-2">WhatsApp</h5>
                <p className="text-muted">Fale com a gente agora mesmo.</p>
                <a
                  href="https://wa.me/351912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success mt-2"
                >
                  Iniciar conversa
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;
