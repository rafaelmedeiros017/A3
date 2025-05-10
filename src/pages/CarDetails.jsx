import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const carFromStorage = localStorage.getItem("carDetails");
    if (carFromStorage) {
      const parsedCar = JSON.parse(carFromStorage);
      if (parsedCar.id.toString() === id.toString()) {
        setCar(parsedCar);
      }
    }
  }, [id]);

  const parseImagens = (imagens) => {
    if (!imagens) return [];
    if (typeof imagens === "string") {
      try {
        const parsed = JSON.parse(imagens);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [imagens];
      }
    }
    return Array.isArray(imagens) ? imagens : [imagens];
  };

  if (!car) {
    return (
      <section className="py-5 text-center">
        <div className="container">
          <p className="fs-4">Carregando detalhes...</p>
        </div>
      </section>
    );
  }

  const imagens = parseImagens(car.imagens);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % imagens.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  return (
    <>
      <Navbar />
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center display-5 fw-bold" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
            {car.marca} {car.modelo}
          </h2>
          <div className="row g-5">
            {/* Imagem */}
            <div className="col-lg-6 position-relative">
              {imagens.length > 0 ? (
                <>
                  <div className="rounded-4 shadow position-relative">
                    <img
                      src={`http://localhost:5000${imagens[activeIndex]}`}
                      className="d-block w-100 rounded-4"
                      style={{ height: "520px", objectFit: "cover" }}
                      alt="Imagem principal"
                    />
                    {imagens.length > 1 && (
                      <>
                        <button
                          onClick={goToPrev}
                          className="position-absolute top-50 start-0 translate-middle-y border-0 bg-transparent text-primary fs-2"
                          style={{ zIndex: 2 }}
                        >
                          <i className="bi bi-chevron-left"></i>
                        </button>
                        <button
                          onClick={goToNext}
                          className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent text-primary fs-2"
                          style={{ zIndex: 2 }}
                        >
                          <i className="bi bi-chevron-right"></i>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="d-flex gap-2 justify-content-center mt-3 flex-wrap">
                    {imagens.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5000${img}`}
                        alt={`Thumb ${index + 1}`}
                        onClick={() => setActiveIndex(index)}
                        className={`img-thumbnail ${index === activeIndex ? "border-primary border-3" : "border-0"}`}
                        style={{ width: "80px", height: "60px", objectFit: "cover", cursor: "pointer" }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted fs-5">Sem imagens disponíveis.</p>
              )}
            </div>

            {/* Informações */}
            <div className="col-lg-6">
              <div className="row row-cols-1 row-cols-md-2 g-3 fs-6">
                {[
                  ["Marca", car.marca, "bi-car-front-fill"],
                  ["Modelo", car.modelo, "bi-list-nested"],
                  ["Ano", car.ano, "bi-calendar-event"],
                  ["Combustível", car.combustivel, "bi-fuel-pump"],
                  ["Quilometragem", `${Number(car.km).toLocaleString()} km`, "bi-speedometer2"],
                  ["Registo", car.registo, "bi-calendar-check"],
                  ["Lugares", car.lugares, "bi-person-bounding-box"],
                  ["Segmento", car.segmento, "bi-grid-3x3-gap"],
                  ["Potência", `${car.potencia} cv`, "bi-lightning-charge-fill"],
                  ["Origem", car.origem, "bi-globe-europe-africa"],
                  ["Cilindrada", `${car.cilindrada} cc`, "bi-speedometer"],
                  ["Transmissão", car.transmissao, "bi-gear-fill"],
                  ["Cor", car.cor, "bi-palette"],
                  ["Portas", car.portas, "bi-door-closed-fill"],
                  ["Estado", car.estado, "bi-shield-check"],
                  ["Garantia", car.garantia, "bi-award"],
                  ["IVA Dedutível", car.ivaDedutivel === true || car.ivaDedutivel === "true" ? "Sim" : "Não", "bi-cash-coin"],
                  ["Preço", Number(car.preco).toLocaleString("pt-PT", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }), "bi-currency-euro"],
                ].map(([label, value, icon], index) => (
                  <div key={index} className="col">
                    <i className={`bi ${icon} text-primary me-2`}></i>
                    <strong>{label}:</strong> {value}
                  </div>
                ))}
              </div>

              {car.informacoesAdicionais && (
  <div className="mt-4 p-4 rounded-4 border border-primary bg-light shadow">
    <h5 className="mb-3 d-flex align-items-center text-primary">
      <i className="bi bi-info-circle-fill me-2 fs-4"></i>
      Informações Adicionais
    </h5>
    <ul className="list-unstyled mb-0">
      {(
        Array.isArray(car.informacoesAdicionais)
          ? car.informacoesAdicionais
          : typeof car.informacoesAdicionais === "string"
          ? car.informacoesAdicionais.split(/\n|,/)
          : []
      ).map((item, index) => {
        const trimmed = item.trim();
        return (
          trimmed && (
            <li key={index} className="d-flex align-items-start mb-2">
              <i className="bi bi-check2-circle text-success me-2 fs-5 mt-1"></i>
              <span className="text-dark" style={{ fontSize: "1.05rem" }}>{trimmed}</span>
            </li>
          )
        );
      })}
    </ul>
  </div>
)}


              <div className="mt-4">
                <a
                  href={`https://wa.me/5599999999999?text=Olá! Tenho interesse no ${car.marca} ${car.modelo} anunciado no site.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-lg w-100 mb-3"
                >
                  <i className="bi bi-whatsapp me-2"></i>Comprar via WhatsApp
                </a>

                <button
                  onClick={() => navigate("/viaturas")}
                  className="btn btn-outline-primary w-100"
                >
                  <i className="bi bi-arrow-left me-2"></i>Ver mais viaturas
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CarDetails;
