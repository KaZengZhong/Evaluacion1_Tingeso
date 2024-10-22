import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">PrestaBanco</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Simulador</Link>
            </li>
            <li className="nav-item">
              <Link to="/apply" className="nav-link">Solicitar Préstamo</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Registrarse</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;