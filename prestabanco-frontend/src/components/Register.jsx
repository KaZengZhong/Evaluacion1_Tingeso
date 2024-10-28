import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rut: '',
    age: '',
    income: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validación del RUT chileno
  const validateRut = (rut) => {
    if (!/^[0-9]{7,8}-[0-9kK]{1}$/.test(rut)) return false;
    
    const rutDigits = rut.split('-')[0];
    const dv = rut.split('-')[1].toLowerCase();
    
    let sum = 0;
    let multiplier = 2;
    
    for (let i = rutDigits.length - 1; i >= 0; i--) {
      sum += parseInt(rutDigits[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const expectedDv = 11 - (sum % 11);
    const calculatedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'k' : expectedDv.toString();
    
    return calculatedDv === dv;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación del nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    // Validación del email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validación de la contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validación de confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validación del RUT
    if (!formData.rut) {
      newErrors.rut = 'El RUT es requerido';
    } else if (!validateRut(formData.rut)) {
      newErrors.rut = 'RUT inválido';
    }

    // Validación de la edad
    const age = parseInt(formData.age);
    if (!age) {
      newErrors.age = 'La edad es requerida';
    } else if (age < 18 || age > 75) {
      newErrors.age = 'La edad debe estar entre 18 y 75 años';
    }

    // Validación de ingresos
    if (!formData.income) {
      newErrors.income = 'El ingreso es requerido';
    } else if (parseFloat(formData.income) <= 0) {
      newErrors.income = 'El ingreso debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Aquí iría la llamada al API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular registro exitoso
      console.log('Usuario registrado:', formData);
      
      // Redireccionar al login
      navigate('/login', { 
        state: { message: 'Registro exitoso. Por favor inicia sesión.' } 
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrors({ submit: 'Error al registrar usuario. Por favor intente nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Registro de Usuario</h3>
          </div>
          <div className="card-body">
            {errors.submit && (
              <div className="alert alert-danger">{errors.submit}</div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">RUT</label>
                <input
                  type="text"
                  className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  placeholder="12345678-9"
                />
                {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Edad</label>
                  <input
                    type="number"
                    className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                  {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Ingreso Mensual</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className={`form-control ${errors.income ? 'is-invalid' : ''}`}
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                    />
                    {errors.income && <div className="invalid-feedback">{errors.income}</div>}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registrando...
                  </span>
                ) : 'Registrarse'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;