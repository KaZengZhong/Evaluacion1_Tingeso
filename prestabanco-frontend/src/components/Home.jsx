import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="hero-simple">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h1 className="display-4 mb-4">Préstamos Hipotecarios</h1>
              <p className="lead mb-4">
                Simula tu préstamo y conoce las mejores opciones para tu vivienda
              </p>
              <div className="mb-5">
                <Link to="/simulator" className="btn btn-primary me-3">
                  Simular Préstamo
                </Link>
                <Link to="/apply" className="btn btn-outline-primary">
                  Solicitar Ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="text-center mb-4">Nuestros Préstamos</h2>
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Primera Vivienda</h5>
                  <p>Hasta 80% financiamiento</p>
                  <p className="text-primary">Tasa desde 3.5%</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Segunda Vivienda</h5>
                  <p>Hasta 70% financiamiento</p>
                  <p className="text-primary">Tasa desde 4.0%</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Comercial</h5>
                  <p>Hasta 60% financiamiento</p>
                  <p className="text-primary">Tasa desde 5.0%</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Remodelación</h5>
                  <p>Hasta 50% financiamiento</p>
                  <p className="text-primary">Tasa desde 4.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container text-center">
          <h2 className="mb-3">¿Listo para comenzar?</h2>
          <p className="mb-4">Simula tu préstamo y conoce las cuotas mensuales</p>
          <Link to="/simulator" className="btn btn-primary">
            Simular Ahora
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;