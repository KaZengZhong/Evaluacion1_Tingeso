import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Mostrar mensaje de registro exitoso si viene desde el registro
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Limpiar el mensaje después de 5 segundos
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Todos los campos son requeridos');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email inválido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // Aquí iría la llamada al API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular login exitoso
      console.log('Login exitoso:', formData);
      
      // Aquí guardarías el token en localStorage
      localStorage.setItem('userToken', 'dummy-token');
      
      // Redireccionar al dashboard o página principal
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white text-center py-3">
            <h3 className="mb-0">Iniciar Sesión</h3>
          </div>
          
          <div className="card-body p-4">
            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setSuccessMessage('')}
                  aria-label="Close"
                ></button>
              </div>
            )}

            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setError(null)}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ejemplo@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Iniciando sesión...
                  </span>
                ) : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="text-center">
              <p className="mb-0">¿No tienes una cuenta?</p>
              <Link to="/register" className="text-primary text-decoration-none">
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>

        {/* Tarjeta de ayuda */}
        <div className="card mt-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">¿Necesitas ayuda?</h5>
            <p className="card-text small">
              Si tienes problemas para iniciar sesión o necesitas recuperar tu contraseña,
              contacta con nuestro servicio de atención al cliente.
            </p>
            <div className="d-grid">
              <a href="tel:+56912345678" className="btn btn-outline-primary btn-sm">
                <i className="bi bi-telephone me-2"></i>
                Llamar a Soporte
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;