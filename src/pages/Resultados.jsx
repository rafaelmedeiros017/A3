import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const Resultados = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [resultados, setResultados] = useState([]);

    const query = new URLSearchParams(location.search);
    const marca = query.get("marca") || "";
    const tamanho = query.get("tamanho") || "";

    const getFirstImage = (imagens) => {
        if (!imagens) return null;
        if (typeof imagens === "string") {
            try {
                const parsed = JSON.parse(imagens);
                return Array.isArray(parsed) ? parsed[0] : parsed;
            } catch {
                return imagens;
            }
        }
        if (Array.isArray(imagens)) return imagens[0];
        return null;
    };

    useEffect(() => {
        const fetchResultados = async () => {
            try {
                // Busca roupas por padrão
                const res = await axios.get("http://localhost:5000/api/roupas");
                const todasAsRoupas = res.data;

                console.log("Filtros:", { marca, tamanho });
                console.log("Todas as roupas:", todasAsRoupas);

                const filtrados = todasAsRoupas.filter((roupa) => {
                    const marcaMatch =
                        !marca ||
                        (roupa.marca &&
                            roupa.marca.toLowerCase().trim() ===
                                marca.toLowerCase().trim());
                    const tamanhoMatch =
                        !tamanho ||
                        (roupa.tamanho &&
                            roupa.tamanho.toLowerCase().trim() ===
                                tamanho.toLowerCase().trim());

                    console.log(
                        `Roupa: ${roupa.marca} - ${roupa.tamanho}, Marca match: ${marcaMatch}, Tamanho match: ${tamanhoMatch}`
                    );

                    return marcaMatch && tamanhoMatch;
                });

                console.log("Filtrados:", filtrados);
                setResultados(filtrados);
            } catch (err) {
                console.error("Erro ao buscar resultados:", err);
            }
        };

        fetchResultados();
    }, [marca, tamanho]);

    const handleClick = (item) => {
        localStorage.setItem("roupaDetails", JSON.stringify(item));
        navigate(`/roupa/${item.id}`);
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h2 className="text-center fw-bold mb-3">
                    Resultados da Pesquisa
                </h2>

                {resultados.length === 0 ? (
                    <p className="text-center text-muted">
                        Nenhuma roupa encontrada com os filtros selecionados.
                    </p>
                ) : (
                    <div className="row g-4">
                        {resultados.map((roupa) => {
                            const imagemPrincipal = getFirstImage(
                                roupa.imagens
                            );
                            return (
                                <div
                                    className="col-md-6 col-lg-4"
                                    key={roupa.id}
                                    onClick={() => handleClick(roupa)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="card shadow rounded-4 h-100 d-flex flex-column">
                                        <div
                                            className="position-relative"
                                            style={{
                                                height: "250px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {roupa.estoque > 0 ? (
                                                <span className="badge bg-success position-absolute top-0 start-0 m-2">
                                                    EM ESTOQUE
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                                                    FORA DE ESTOQUE
                                                </span>
                                            )}
                                            {imagemPrincipal && (
                                                <img
                                                    src={`http://localhost:5000${imagemPrincipal}`}
                                                    alt={`${roupa.marca} ${roupa.tipo}`}
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
                                                    {roupa.cor}
                                                    <i className="bi bi-rulers ms-3 me-1"></i>{" "}
                                                    {roupa.tamanho}
                                                    <i className="bi bi-shirt ms-3 me-1"></i>{" "}
                                                    {roupa.material}
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
                )}
            </div>
            <Footer />
        </>
    );
};

export default Resultados;
