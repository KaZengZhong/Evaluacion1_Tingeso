import { useState } from 'react';

function LoanSimulator() {
  const [formData, setFormData] = useState({
    loanType: 'FIRST_HOME',
    amount: '',
    term: ''
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí iría la llamada al servicio cuando lo implementemos
      console.log('Datos enviados:', formData);
      setResult({
        monthlyPayment: 1000,
        totalCost: 120000
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Simulador de Préstamos</h3>
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
              <option value="FIRST_HOME">Primera Vivienda</option>
              <option value="SECOND_HOME">Segunda Vivienda</option>
              <option value="COMMERCIAL">Propiedad Comercial</option>
              <option value="RENOVATION">Remodelación</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Monto</label>
            <input 
              type="number" 
              className="form-control"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="Ingrese el monto del préstamo"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Plazo (meses)</label>
            <input 
              type="number" 
              className="form-control"
              value={formData.term}
              onChange={(e) => setFormData({...formData, term: e.target.value})}
              placeholder="Ingrese el plazo en meses"
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Simular
          </button>
        </form>

        {result && (
          <div className="mt-4">
            <h4>Resultados de la Simulación</h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td><strong>Cuota Mensual:</strong></td>
                    <td>${result.monthlyPayment}</td>
                  </tr>
                  <tr>
                    <td><strong>Costo Total:</strong></td>
                    <td>${result.totalCost}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoanSimulator;