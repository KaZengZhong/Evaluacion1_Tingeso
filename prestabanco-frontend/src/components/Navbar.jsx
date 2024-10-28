import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="/images/logo.png" alt="PrestaBanco" height="40" />
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/simulator" className="nav-link">
                Simulador
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/apply" className="nav-link">
                Solicitar Préstamo
              </Link>
            </li>
          </ul>
          
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-primary">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="btn btn-primary">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;