import './HeroSection.css';
import logo from '../assets/Stand-Oline_logo_White-removebg-preview.png';
import backgroundImage from '../assets/header_desktop1.webp';

export default function HeroSection() {
  return (
    <section
      className="hero-section d-flex align-items-center text-white text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
      }}
    >
      <div className="container hero-content">
        <div className="logo-hero mb-3">
          <img src={logo} alt="Logo Stand Online" className="img-fluid" style={{ maxWidth: '400px' }} />
        </div>

        <h2 className="fw-bold mb-4">Que Viatura Procura?</h2>

        <div className="search-form bg-white rounded-pill shadow p-3 px-4 d-flex flex-wrap align-items-center justify-content-center gap-3">
          <div className="form-group">
            <label className="form-label text-primary small">Marca</label>
            <select className="form-select border-0">
              <option>Selecionar</option>
              <option>BMW</option>
              <option>Porsche</option>
              <option>Fiat</option>
              <option>Jeep</option>
              <option>Ford</option>
              <option>Hyundai</option>
              <option>Volkswagem</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label text-primary small">Modelo</label>
            <select className="form-select border-0">
              <option>Selecionar</option>
              <option>1.0</option>
              <option>2.0</option>
              <option>3.0</option>
              <option>4.0</option>
              <option>5.0</option>
              <option>6.0</option>
              <option>7.0</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label text-primary small">Combustível</label>
            <select className="form-select border-0">
              <option>Selecionar</option>
              <option>Electrico</option>
              <option>Gasolina</option>
              <option>Gaséleo</option>
              <option>Híbrido Gasolina</option>
              <option>Híbrido Plug-In Gasolina</option>
            </select>
          </div>
          <button className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
            <i className="bi bi-search"></i>
          </button>
        </div>

        <div className="mt-4">
          <button className="btn btn-light rounded-pill shadow-sm px-4 py-2">
            <i className="bi bi-filter me-2"></i> PESQUISA DETALHADA
          </button>
        </div>
      </div>
    </section>
  );
}
