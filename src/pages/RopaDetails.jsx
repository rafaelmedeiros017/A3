import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const RopaDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roupa, setRoupa] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const [quantidade, setQuantidade] = useState(1);

    useEffect(() => {
        const roupaFromStorage = localStorage.getItem("roupaDetails");
        if (roupaFromStorage) {
            const parsedRoupa = JSON.parse(roupaFromStorage);
            if (parsedRoupa.id.toString() === id.toString()) {
                setRoupa(parsedRoupa);
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

    const handleAdicionarAoCarrinho = () => {
        if (quantidade > roupa.estoque) {
            setErro("Quantidade superior ao estoque disponível.");
            setTimeout(() => setErro(""), 5000);
            return;
        }

        setMensagem(
            `${quantidade} ${roupa.tipo}(s) adicionada(s) ao carrinho!`
        );
        setQuantidade(1);
        setTimeout(() => setMensagem(""), 5000);
    };

    if (!roupa) {
        return (
            <>
                <Navbar />
                <section className="py-5 text-center">
                    <div className="container">
                        <p className="fs-4">Carregando detalhes...</p>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    const imagens = parseImagens(roupa.imagens);

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
                    {mensagem && (
                        <div
                            className="alert alert-success text-center"
                            role="alert"
                        >
                            {mensagem}
                        </div>
                    )}
                    {erro && (
                        <div
                            className="alert alert-danger text-center"
                            role="alert"
                        >
                            {erro}
                        </div>
                    )}

                    <h2
                        className="mb-4 text-center display-5 fw-bold"
                        style={{ fontFamily: "'Segoe UI', sans-serif" }}
                    >
                        {roupa.modelo || roupa.tipo}
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
                                            style={{
                                                height: "520px",
                                                objectFit: "cover",
                                            }}
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
                                                onClick={() =>
                                                    setActiveIndex(index)
                                                }
                                                className={`img-thumbnail ${
                                                    index === activeIndex
                                                        ? "border-primary border-3"
                                                        : "border-0"
                                                }`}
                                                style={{
                                                    width: "80px",
                                                    height: "60px",
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="text-muted fs-5">
                                    Sem imagens disponíveis.
                                </p>
                            )}
                        </div>

                        {/* Informações */}
                        <div className="col-lg-6">
                            <div className="row row-cols-1 row-cols-md-2 g-3 fs-6">
                                {[
                                    ["Marca", roupa.marca, "bi-shop"],
                                    ["Tamanho", roupa.tamanho, "bi-rulers"],
                                    ["Tipo", roupa.tipo, "bi-bag"],
                                    ["Cor", roupa.cor, "bi-palette"],
                                    [
                                        "Material",
                                        roupa.material,
                                        "bi-patch-check",
                                    ],
                                    [
                                        "Estoque",
                                        `${roupa.estoque} unidades`,
                                        "bi-box-seam",
                                    ],
                                    [
                                        "Preço",
                                        Number(roupa.preco).toLocaleString(
                                            "pt-PT",
                                            {
                                                style: "currency",
                                                currency: "EUR",
                                                minimumFractionDigits: 0,
                                            }
                                        ),
                                        "bi-currency-euro",
                                    ],
                                ].map(([label, value, icon], index) => (
                                    <div key={index} className="col">
                                        <i
                                            className={`bi ${icon} text-primary me-2`}
                                        ></i>
                                        <strong>{label}:</strong> {value}
                                    </div>
                                ))}
                            </div>

                            {roupa.descricao && (
                                <div className="mt-4 p-4 rounded-4 border border-primary bg-light shadow">
                                    <h5 className="mb-3 d-flex align-items-center text-primary">
                                        <i className="bi bi-info-circle-fill me-2 fs-4"></i>
                                        Descrição
                                    </h5>
                                    <ul className="list-unstyled mb-0">
                                        {(Array.isArray(roupa.descricao)
                                            ? roupa.descricao
                                            : typeof roupa.descricao ===
                                              "string"
                                            ? roupa.descricao.split(/\n|,/)
                                            : []
                                        ).map((item, index) => {
                                            const trimmed = item.trim();
                                            return (
                                                trimmed && (
                                                    <li
                                                        key={index}
                                                        className="d-flex align-items-start mb-2"
                                                    >
                                                        <i className="bi bi-check2-circle text-success me-2 fs-5 mt-1"></i>
                                                        <span
                                                            className="text-dark"
                                                            style={{
                                                                fontSize:
                                                                    "1.05rem",
                                                            }}
                                                        >
                                                            {trimmed}
                                                        </span>
                                                    </li>
                                                )
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-4">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        Quantidade:
                                    </label>
                                    <div className="d-flex align-items-center gap-3">
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() =>
                                                setQuantidade(
                                                    Math.max(1, quantidade - 1)
                                                )
                                            }
                                            disabled={quantidade === 1}
                                        >
                                            <i className="bi bi-dash"></i>
                                        </button>
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            value={quantidade}
                                            onChange={(e) =>
                                                setQuantidade(
                                                    Math.max(
                                                        1,
                                                        parseInt(
                                                            e.target.value
                                                        ) || 1
                                                    )
                                                )
                                            }
                                            max={roupa.estoque}
                                            min="1"
                                            style={{ maxWidth: "80px" }}
                                        />
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() =>
                                                setQuantidade(
                                                    Math.min(
                                                        roupa.estoque,
                                                        quantidade + 1
                                                    )
                                                )
                                            }
                                            disabled={
                                                quantidade === roupa.estoque
                                            }
                                        >
                                            <i className="bi bi-plus"></i>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAdicionarAoCarrinho}
                                    className="btn btn-primary w-100 mb-3"
                                    disabled={roupa.estoque === 0}
                                >
                                    <i className="bi bi-bag-plus-fill me-2"></i>
                                    {roupa.estoque === 0
                                        ? "Fora de Estoque"
                                        : "Adicionar ao Carrinho"}
                                </button>

                                <a
                                    href={`https://wa.me/5599999999999?text=Olá! Tenho interesse na ${roupa.marca} ${roupa.tipo} anunciada no site.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-success btn-lg w-100 mb-3"
                                >
                                    <i className="bi bi-whatsapp me-2"></i>
                                    Comprar via WhatsApp
                                </a>

                                <button
                                    onClick={() => navigate("/roupas")}
                                    className="btn btn-outline-primary w-100"
                                >
                                    <i className="bi bi-arrow-left me-2"></i>Ver
                                    mais roupas
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

export default RopaDetails;
