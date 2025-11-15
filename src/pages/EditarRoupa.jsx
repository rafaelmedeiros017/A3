import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const EditarRoupa = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
    const [imagensAtuais, setImagensAtuais] = useState([]);
    const [autorizado, setAutorizado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const jaVerificado = useRef(false);

    useEffect(() => {
        if (!jaVerificado.current) {
            jaVerificado.current = true;
            const senha = prompt(
                "Digite a senha para acessar a página de administração:"
            );
            if (senha === "1234") {
                setAutorizado(true);
                fetchRoupa();
            } else {
                alert("Senha incorreta!");
                navigate("/");
            }
        }
    }, [navigate, id]);

    const fetchRoupa = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/roupas/${id}`
            );
            const roupaData = res.data;
            setImagensAtuais(
                Array.isArray(roupaData.imagens)
                    ? roupaData.imagens
                    : [roupaData.imagens]
            );
            setRoupa({
                marca: roupaData.marca || "",
                modelo: roupaData.modelo || "",
                tamanho: roupaData.tamanho || "",
                cor: roupaData.cor || "",
                preco: roupaData.preco || "",
                tipo: roupaData.tipo || "",
                material: roupaData.material || "",
                estoque: roupaData.estoque || "",
                imagens: [],
                descricao: Array.isArray(roupaData.descricao)
                    ? roupaData.descricao
                    : [],
            });
        } catch (error) {
            console.error("Erro ao buscar roupa:", error);
            setMessage("Erro ao carregar os dados da roupa");
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
            await axios.put(
                `http://localhost:5000/api/roupas/${id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setMessage("Roupa atualizada com sucesso!");
            setTimeout(() => {
                navigate("/admin/featured-roupas");
            }, 1500);
        } catch (error) {
            console.error("Erro ao atualizar roupa:", error);
            setMessage("Erro ao atualizar roupa");
        } finally {
            setLoading(false);
        }
    };

    if (!autorizado) return null;

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Editar Roupa</h2>

            {message && (
                <div
                    className={`alert ${
                        message.includes("sucesso")
                            ? "alert-success"
                            : "alert-danger"
                    } text-center`}
                >
                    {message}
                </div>
            )}

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
                        <label className="form-label">Imagens Atuais</label>
                        <div className="d-flex gap-2 flex-wrap">
                            {imagensAtuais.map((img, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:5000${img}`}
                                    alt={`Imagem ${index + 1}`}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        border: "2px solid #ddd",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-12 mb-3">
                        <label className="form-label">
                            Alterar Imagens (opcional)
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            name="imagens"
                            onChange={handleChange}
                            accept="image/*"
                            multiple
                        />
                        <small className="text-muted">
                            Se você enviar novas imagens, as antigas serão
                            substituídas
                        </small>
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

                    <div className="col-12 mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Atualizando..." : "Atualizar Roupa"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary w-100 mt-2"
                            onClick={() => navigate("/admin/featured-roupas")}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditarRoupa;
