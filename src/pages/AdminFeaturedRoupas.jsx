import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminFeaturedRoupas = ({ navigate: propNavigate }) => {
    const [roupa, setRoupa] = useState({
        marca: "",
        modelo: "",
        tamanho: "",
        cor: "",
        preco: "",
        tipo: "",
        material: "",
        estoque: "",
        imagens: [],
        descricao: [],
    });

    const [roupas, setRoupas] = useState([]);
    const [autorizado, setAutorizado] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const jaVerificado = useRef(false);

    useEffect(() => {
        if (!jaVerificado.current) {
            jaVerificado.current = true;
            const senha = prompt(
                "Digite a senha para acessar a página de administração:"
            );
            if (senha === "1234") {
                setAutorizado(true);
                fetchRoupas();
            } else {
                alert("Senha incorreta!");
                navigate("/");
            }
        }
    }, [navigate]);

    const fetchRoupas = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/roupas");
            setRoupas(res.data);
        } catch (error) {
            console.error("Erro ao buscar roupas:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setRoupa({ ...roupa, imagens: Array.from(files) });
        } else {
            setRoupa({ ...roupa, [name]: value });
        }
    };

    const handleAddDesc = () => {
        setRoupa({ ...roupa, descricao: [...roupa.descricao, ""] });
    };

    const handleRemoveDesc = (index) => {
        const novasDescs = roupa.descricao.filter((_, i) => i !== index);
        setRoupa({ ...roupa, descricao: novasDescs });
    };

    const handleChangeDesc = (index, value) => {
        const novasDescs = [...roupa.descricao];
        novasDescs[index] = value;
        setRoupa({ ...roupa, descricao: novasDescs });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.entries(roupa).forEach(([key, val]) => {
            if (key === "imagens") {
                val.forEach((img) => formData.append("imagens", img));
            } else if (key === "descricao") {
                formData.append("descricao", JSON.stringify(val));
            } else {
                formData.append(key, val);
            }
        });

        try {
            await axios.post("http://localhost:5000/api/roupas", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            fetchRoupas();

            setRoupa({
                marca: "",
                modelo: "",
                tamanho: "",
                cor: "",
                preco: "",
                tipo: "",
                material: "",
                estoque: "",
                imagens: [],
                descricao: [],
            });
        } catch (error) {
            console.error("Erro ao adicionar roupa:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar esta roupa?")) {
            try {
                await axios.delete(`http://localhost:5000/api/roupas/${id}`);
                fetchRoupas();
            } catch (error) {
                console.error("Erro ao deletar roupa:", error);
            }
        }
    };

    if (!autorizado) return null;

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Adicionar Roupa em Destaque</h2>
            <form
                onSubmit={handleSubmit}
                className="mx-auto"
                style={{ maxWidth: "900px" }}
            >
                <div className="row">
                    {[
                        { label: "Marca", name: "marca", type: "text" },
                        { label: "Modelo", name: "modelo", type: "text" },
                        { label: "Cor", name: "cor", type: "text" },
                        { label: "Preço (€)", name: "preco", type: "number" },
                        { label: "Material", name: "material", type: "text" },
                        { label: "Estoque", name: "estoque", type: "number" },
                    ].map(({ label, name, type, placeholder }) => (
                        <div className="col-md-6 mb-3" key={name}>
                            <label className="form-label">{label}</label>
                            <input
                                type={type}
                                className="form-control"
                                name={name}
                                placeholder={placeholder}
                                value={roupa[name]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Tipo</label>
                        <select
                            className="form-select"
                            name="tipo"
                            value={roupa.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecionar tipo</option>
                            <option>Camiseta</option>
                            <option>Calça</option>
                            <option>Vestido</option>
                            <option>Jaqueta</option>
                            <option>Blusa</option>
                            <option>Saia</option>
                            <option>Shorts</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Tamanho</label>
                        <select
                            className="form-select"
                            name="tamanho"
                            value={roupa.tamanho}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecionar tamanho</option>
                            <option>PP</option>
                            <option>P</option>
                            <option>M</option>
                            <option>G</option>
                            <option>GG</option>
                            <option>XG</option>
                            <option>XXG</option>
                        </select>
                    </div>

                    <div className="col-12 mb-3">
                        <label className="form-label">Imagens</label>
                        <input
                            type="file"
                            className="form-control"
                            name="imagens"
                            onChange={handleChange}
                            accept="image/*"
                            multiple
                            required
                        />
                    </div>

                    <div className="col-12 mb-3">
                        <label className="form-label">Descrição</label>
                        {roupa.descricao.map((desc, index) => (
                            <div key={index} className="input-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Adicionar descrição"
                                    value={desc}
                                    onChange={(e) =>
                                        handleChangeDesc(index, e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveDesc(index)}
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleAddDesc}
                        >
                            Adicionar Descrição
                        </button>
                    </div>

                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Adicionando..." : "Adicionar Roupa"}
                        </button>
                    </div>
                </div>
            </form>

            <hr className="my-5" />

            <h3 className="text-center mb-4">Roupas Adicionadas</h3>
            <div className="row">
                {roupas.map((r) => {
                    const imagens = Array.isArray(r.imagens)
                        ? r.imagens
                        : [r.imagens];
                    const descs = Array.isArray(r.descricao) ? r.descricao : [];

                    return (
                        <div className="col-md-6 mb-4" key={r.id}>
                            <div className="card h-100 shadow-sm">
                                {imagens.length > 0 && (
                                    <Carousel
                                        indicators={false}
                                        controls={imagens.length > 1}
                                    >
                                        {imagens.map((imgPath, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    src={`http://localhost:5000${imgPath}`}
                                                    className="d-block w-100"
                                                    alt={`${r.marca} ${
                                                        r.tipo
                                                    } imagem ${index + 1}`}
                                                    style={{
                                                        height: "250px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {r.marca} - {r.modelo}
                                    </h5>
                                    <p className="card-text">
                                        Tipo: {r.tipo}
                                        <br />
                                        Tamanho: {r.tamanho}
                                        <br />
                                        Cor: {r.cor}
                                        <br />
                                        Material: {r.material}
                                        <br />
                                        Preço: €{r.preco}
                                        <br />
                                        Estoque: {r.estoque} unidades
                                        <br />
                                        <strong>Status:</strong>{" "}
                                        {r.estoque > 0 ? (
                                            <span className="text-success fw-bold">
                                                Em Estoque
                                            </span>
                                        ) : (
                                            <span className="text-danger fw-bold">
                                                Fora de Estoque
                                            </span>
                                        )}
                                    </p>

                                    {descs.length > 0 && (
                                        <div className="mb-3">
                                            <strong>Descrição:</strong>
                                            <ul className="mb-0">
                                                {descs.map((desc, i) => (
                                                    <li key={i}>{desc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/editar-roupa/${r.id}`
                                                )
                                            }
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger w-100"
                                            onClick={() => handleDelete(r.id)}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminFeaturedRoupas;
