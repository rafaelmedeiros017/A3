import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const Viaturas = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/cars"
                );
                setCars(response.data);
            } catch (error) {
                console.error("Erro ao buscar carros:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const getFirstImage = (imagens) => {
        try {
            const parsed =
                typeof imagens === "string" ? JSON.parse(imagens) : imagens;
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed[0];
            }
        } catch (e) {
            return imagens;
        }
        return null;
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <section className="py-5 bg-light text-center">
                    <div className="container">
                        <p className="text-secondary">Carregando veiculos...</p>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    if (cars.length === 0) {
        return (
            <>
                <Navbar />
                <section className="py-5 bg-light text-center">
                    <div className="container">
                        <p className="text-muted">
                            Nenhum veiculo disponível.
                        </p>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center fw-bold mb-2">
                        Todas as Viaturas
                    </h2>
                    <p className="text-center text-primary mb-4">
                        Veja todos os veiculos disponíveis no Stand Online
                    </p>

                    <div className="row g-4">
                        {cars.map((car) => {
                            const firstImage = getFirstImage(car.imagens);
                            return (
                                <div className="col-md-6 col-lg-4" key={car.id}>
                                    <div
                                        className="card shadow rounded-4 h-100 d-flex flex-column"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            localStorage.setItem(
                                                "carDetails",
                                                JSON.stringify(car)
                                            );
                                            navigate(`/carro/${car.id}`);
                                        }}
                                    >
                                        <div
                                            className="position-relative"
                                            style={{
                                                height: "300px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {(car.ivaDedutivel === true ||
                                                car.ivaDedutivel ===
                                                    "true") && (
                                                <span className="badge bg-primary position-absolute top-0 start-0 m-2">
                                                    IVA DEDUTÍVEL
                                                </span>
                                            )}
                                            {firstImage && (
                                                <img
                                                    src={`http://localhost:5000${firstImage}`}
                                                    alt={car.modelo}
                                                    className="w-100 h-100 object-fit-cover rounded-top-4"
                                                    style={{
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className="card-body d-flex flex-column justify-content-between flex-grow-1">
                                            <div>
                                                <h5 className="fw-bold">
                                                    {car.marca}
                                                </h5>
                                                <p className="mb-2">
                                                    {car.modelo}
                                                </p>
                                                <p className="mb-2">
                                                    <i className="bi bi-calendar me-1"></i>{" "}
                                                    {car.ano}{" "}
                                                    <i className="bi bi-fuel-pump ms-3 me-1"></i>{" "}
                                                    {car.combustivel}{" "}
                                                    <i className="bi bi-speedometer2 ms-3 me-1"></i>{" "}
                                                    {Number(
                                                        car.km
                                                    ).toLocaleString()}{" "}
                                                    km
                                                </p>
                                            </div>
                                            <h5 className="text-primary fw-bold mt-auto">
                                                {Number(
                                                    car.preco
                                                ).toLocaleString("pt-PT", {
                                                    style: "currency",
                                                    currency: "EUR",
                                                    minimumFractionDigits: 0,
                                                })}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Viaturas;
