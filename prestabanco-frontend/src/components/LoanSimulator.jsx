import { useState, useEffect } from 'react';

function LoanSimulator() {
  const [formData, setFormData] = useState({
    loanType: 'FIRST_HOME',
    amount: '',
    term: '',
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Información de tipos de préstamos
  const loanTypes = {
    FIRST_HOME: {
      name: 'Primera Vivienda',
      maxTerm: 30 * 12, // 30 años en meses
      interestRate: '3.5% - 5.0%',
      maxFinancing: '80%'
    },
    SECOND_HOME: {
      name: 'Segunda Vivienda',
      maxTerm: 20 * 12,
      interestRate: '4.0% - 6.0%',
      maxFinancing: '70%'
    },
    COMMERCIAL: {
      name: 'Propiedad Comercial',
      maxTerm: 25 * 12,
      interestRate: '5.0% - 7.0%',
      maxFinancing: '60%'
    },
    RENOVATION: {
      name: 'Remodelación',
      maxTerm: 15 * 12,
      interestRate: '4.5% - 6.0%',
      maxFinancing: '50%'
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }
    if (!formData.term || formData.term <= 0) {
      newErrors.term = 'El plazo debe ser mayor a 0';
    } else if (formData.term > loanTypes[formData.loanType].maxTerm) {
      newErrors.term = `El plazo máximo para este tipo de préstamo es ${loanTypes[formData.loanType].maxTerm / 12} años`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulación de llamada al API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cálculos de ejemplo
      const monthlyRate = 0.005; // 6% anual
      const months = parseInt(formData.term);
      const amount = parseFloat(formData.amount);
      
      const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                            (Math.pow(1 + monthlyRate, months) - 1);
      
      const totalCost = monthlyPayment * months;
      const insuranceCost = amount * 0.0003; // 0.03% mensual
      const administrationFee = amount * 0.01; // 1%

      setResult({
        monthlyPayment: monthlyPayment.toFixed(2),
        totalCost: totalCost.toFixed(2),
        totalInterest: (totalCost - amount).toFixed(2),
        insuranceCost: insuranceCost.toFixed(2),
        administrationFee: administrationFee.toFixed(2)
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      {/* Columna de información */}
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Información del Préstamo</h4>
          </div>
          <div className="card-body">
            <h5>Tipo: {loanTypes[formData.loanType].name}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Tasa de Interés:</strong><br/>
                {loanTypes[formData.loanType].interestRate}
              </li>
              <li className="list-group-item">
                <strong>Financiamiento Máximo:</strong><br/>
                {loanTypes[formData.loanType].maxFinancing}
              </li>
              <li className="list-group-item">
                <strong>Plazo Máximo:</strong><br/>
                {loanTypes[formData.loanType].maxTerm / 12} años
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Columna del formulario */}
      <div className="col-md-8">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Simulador de Préstamos</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Tipo de Préstamo</label>
                <select 
                  className="form-select"
                  value={formData.loanType}
                  onChange={(e) => setFormData({...formData, loanType: e.target.value})}
                >
                  {Object.entries(loanTypes).map(([key, value]) => (
                    <option key={key} value={key}>{value.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Monto del Préstamo</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input 
                    type="number" 
                    className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="Ingrese el monto"
                  />
                  {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Plazo (meses)</label>
                <input 
                  type="number" 
                  className={`form-control ${errors.term ? 'is-invalid' : ''}`}
                  value={formData.term}
                  onChange={(e) => setFormData({...formData, term: e.target.value})}
                  placeholder="Ingrese el plazo en meses"
                />
                {errors.term && <div className="invalid-feedback">{errors.term}</div>}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Calculando...
                  </span>
                ) : 'Simular Préstamo'}
              </button>
            </form>

            {result && (
              <div className="mt-4">
                <h4 className="mb-3">Resultados de la Simulación</h4>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td className="bg-light"><strong>Cuota Mensual:</strong></td>
                        <td className="text-end">${result.monthlyPayment}</td>
                      </tr>
                      <tr>
                        <td className="bg-light"><strong>Costo Total:</strong></td>
                        <td className="text-end">${result.totalCost}</td>
                      </tr>
                      <tr>
                        <td className="bg-light"><strong>Total en Intereses:</strong></td>
                        <td className="text-end">${result.totalInterest}</td>
                      </tr>
                      <tr>
                        <td className="bg-light"><strong>Seguro Mensual:</strong></td>
                        <td className="text-end">${result.insuranceCost}</td>
                      </tr>
                      <tr>
                        <td className="bg-light"><strong>Comisión:</strong></td>
                        <td className="text-end">${result.administrationFee}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanSimulator;