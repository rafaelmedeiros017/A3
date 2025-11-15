import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const Roupas = () => {
    const [roupas, setRoupas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoupas = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/roupas"
                );
                setRoupas(response.data);
            } catch (error) {
                console.error("Erro ao buscar roupas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoupas();
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
                        <p className="text-secondary">Carregando roupas...</p>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    if (roupas.length === 0) {
        return (
            <>
                <Navbar />
                <section className="py-5 bg-light text-center">
                    <div className="container">
                        <p className="text-muted">Nenhuma roupa disponível.</p>
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
                        Todas as Roupas
                    </h2>
                    <p className="text-center text-primary mb-4">
                        Veja todas as peças disponíveis na Loja Online
                    </p>

                    <div className="row g-4">
                        {roupas.map((roupa) => {
                            const firstImage = getFirstImage(roupa.imagens);
                            return (
                                <div
                                    className="col-md-6 col-lg-4"
                                    key={roupa.id}
                                >
                                    <div
                                        className="card shadow rounded-4 h-100 d-flex flex-column"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            localStorage.setItem(
                                                "roupaDetails",
                                                JSON.stringify(roupa)
                                            );
                                            navigate(`/roupa/${roupa.id}`);
                                        }}
                                    >
                                        <div
                                            className="position-relative"
                                            style={{
                                                height: "300px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {roupa.estoque > 0 && (
                                                <span className="badge bg-success position-absolute top-0 start-0 m-2">
                                                    EM ESTOQUE
                                                </span>
                                            )}
                                            {roupa.estoque === 0 && (
                                                <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                                                    FORA DE ESTOQUE
                                                </span>
                                            )}
                                            {firstImage && (
                                                <img
                                                    src={`http://localhost:5000${firstImage}`}
                                                    alt={roupa.tipo}
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
                                                    {roupa.modelo || roupa.tipo}
                                                </h5>
                                                <p className="mb-2">
                                                    <i className="bi bi-shop me-1"></i>{" "}
                                                    {roupa.marca}{" "}
                                                    <i className="bi bi-palette ms-3 me-1"></i>{" "}
                                                    {roupa.cor}{" "}
                                                    <i className="bi bi-shirt ms-3 me-1"></i>{" "}
                                                    {roupa.material}{" "}
                                                    <i className="bi bi-box-seam ms-3 me-1"></i>{" "}
                                                    {roupa.estoque} unidades
                                                </p>
                                            </div>
                                            <h5 className="text-primary fw-bold mt-auto">
                                                {Number(
                                                    roupa.preco
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

export default Roupas;
