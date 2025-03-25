import React, { useEffect, useState } from "react";
import Navbar from "../components/Header";

const CarDetails = () => {
  const [car, setCar] = useState(null);

  useEffect(() => {
    const storedCar = localStorage.getItem("carDetails");
    if (storedCar) {
      setCar(JSON.parse(storedCar));
    }
  }, []);

  if (!car) return <p className="text-center mt-5">Carregando...</p>;

  return (
    <>
      <Navbar />
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={`http://localhost:5000${car.imagem}`}
              alt={car.modelo}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold">{car.marca}</h2>
            <h4 className="mb-4 text-secondary">{car.modelo}</h4>
            <h3 className="text-primary fw-bold mb-4">
              {Number(car.preco).toLocaleString("pt-PT", {
                style: "currency",
                currency: "EUR",
              })}
            </h3>
            <ul className="list-unstyled fs-5">
              <li className="mb-2">
                <i className="bi bi-calendar-event-fill text-primary me-2"></i>
                <strong>Ano:</strong> {car.ano}
              </li>
              <li className="mb-2">
                <i className="bi bi-fuel-pump-fill text-danger me-2"></i>
                <strong>Combustível:</strong> {car.combustivel}
              </li>
              <li className="mb-2">
                <i className="bi bi-speedometer2 text-success me-2"></i>
                <strong>KM:</strong> {car.km.toLocaleString()} km
              </li>
              <li className="mb-2">
                <i className="bi bi-cash-coin text-warning me-2"></i>
                <strong>IVA Dedutível:</strong> {car.ivaDedutivel ? "Sim" : "Não"}
              </li>
            </ul>
            <button className="btn btn-primary btn-lg mt-3 w-100">
              <i className="bi bi-cart-fill me-2"></i>Comprar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarDetails;
