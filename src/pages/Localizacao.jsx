import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Localizacao() {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Nossa Localização</h2>
        <div className="ratio ratio-16x9">
          <iframe
            title="Localização da loja"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1426.617786012046!2d-42.72359868802669!3d-13.768581787345747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x75b3965e9062c3d%3A0xe07235a7f8dd0aef!2sSupermercado%20Suprivenda!5e1!3m2!1spt-BR!2sbr!4v1745167414336!5m2!1spt-BR!2sbr"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <p className="text-center mt-3">
          Estamos localizados no coração da cidade, venha nos visitar!
        </p>
      </div>
      <Footer />
    </>
  );
}
