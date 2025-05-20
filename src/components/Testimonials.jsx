import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      nome: "João Silva",
      comentario: "Atendimento excelente e veiculo entregue em perfeitas condições. Recomendo totalmente!",
      cidade: "Lisboa",
      imagem: "https://randomuser.me/api/portraits/men/32.jpg",
      estrelas: 5,
    },
    {
      nome: "Carla Mendes",
      comentario: "Equipa muito profissional e simpática. Consegui o financiamento com rapidez. Estou muito satisfeita!",
      cidade: "Porto",
      imagem: "https://randomuser.me/api/portraits/women/45.jpg",
      estrelas: 4,
    },
    {
      nome: "Rui Gonçalves",
      comentario: "Comprei meu carro há 6 meses e está impecável até hoje. Tudo correu como combinado.",
      cidade: "Faro",
      imagem: "https://randomuser.me/api/portraits/men/65.jpg",
      estrelas: 5,
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center fw-bold mb-4 white">O que dizem os nossos clientes</h2>
        <div className="row g-4">
          {testimonials.map((testemunho, index) => (
            <div className="col-md-4" key={index}>
              <div className="card shadow rounded-4 h-100 p-3">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={testemunho.imagem}
                    alt={testemunho.nome}
                    className="rounded-circle me-3"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="fw-bold mb-0">{testemunho.nome}</h6>
                    <small className="text-secondary">{testemunho.cidade}</small>
                  </div>
                </div>
                <p className="text-muted fst-italic mb-3">"{testemunho.comentario}"</p>
                <div className="text-warning">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${i < testemunho.estrelas ? "bi-star-fill" : "bi-star"}`}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
