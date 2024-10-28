import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoanApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Información del préstamo
    loanType: 'FIRST_HOME',
    requestedAmount: '',
    term: '',
    // Información laboral
    employmentType: '',
    employmentYears: '',
    monthlyIncome: '',
    otherIncome: '0',
    // Información de la propiedad
    propertyType: '',
    propertyValue: '',
    propertyAddress: '',
    // Documentos
    documents: {
      incomeProof: null,
      propertyAppraisal: null,
      creditHistory: null,
      employmentCertificate: null
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loanTypes = {
    FIRST_HOME: {
      name: 'Primera Vivienda',
      maxFinancing: 80,
      requiredDocuments: ['incomeProof', 'propertyAppraisal', 'creditHistory']
    },
    SECOND_HOME: {
      name: 'Segunda Vivienda',
      maxFinancing: 70,
      requiredDocuments: ['incomeProof', 'propertyAppraisal', 'creditHistory']
    },
    COMMERCIAL: {
      name: 'Propiedad Comercial',
      maxFinancing: 60,
      requiredDocuments: ['incomeProof', 'propertyAppraisal', 'creditHistory', 'businessPlan']
    },
    RENOVATION: {
      name: 'Remodelación',
      maxFinancing: 50,
      requiredDocuments: ['incomeProof', 'propertyAppraisal', 'renovationBudget']
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.loanType) newErrors.loanType = 'Seleccione un tipo de préstamo';
        if (!formData.requestedAmount || formData.requestedAmount <= 0) {
          newErrors.requestedAmount = 'Ingrese un monto válido';
        }
        if (!formData.term || formData.term <= 0) newErrors.term = 'Ingrese un plazo válido';
        break;

      case 2:
        if (!formData.employmentType) newErrors.employmentType = 'Seleccione su tipo de empleo';
        if (!formData.employmentYears || formData.employmentYears < 0) {
          newErrors.employmentYears = 'Ingrese años de empleo válidos';
        }
        if (!formData.monthlyIncome || formData.monthlyIncome <= 0) {
          newErrors.monthlyIncome = 'Ingrese un ingreso mensual válido';
        }
        break;

      case 3:
        if (!formData.propertyType) newErrors.propertyType = 'Seleccione el tipo de propiedad';
        if (!formData.propertyValue || formData.propertyValue <= 0) {
          newErrors.propertyValue = 'Ingrese el valor de la propiedad';
        }
        if (!formData.propertyAddress) newErrors.propertyAddress = 'Ingrese la dirección';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleFileUpload = (documentType, file) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      // Aquí iría la llamada al API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular envío exitoso
      console.log('Solicitud enviada:', formData);
      
      // Redireccionar a página de confirmación o seguimiento
      navigate('/application-status', { 
        state: { message: 'Solicitud enviada exitosamente' } 
      });
    } catch (error) {
      setErrors({ submit: 'Error al enviar la solicitud. Por favor intente nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="card-body">
      <h4 className="mb-4">Información del Préstamo</h4>
      
      <div className="mb-3">
        <label className="form-label">Tipo de Préstamo</label>
        <select
          className={`form-select ${errors.loanType ? 'is-invalid' : ''}`}
          value={formData.loanType}
          onChange={(e) => setFormData({...formData, loanType: e.target.value})}
        >
          {Object.entries(loanTypes).map(([key, value]) => (
            <option key={key} value={key}>{value.name}</option>
          ))}
        </select>
        {errors.loanType && <div className="invalid-feedback">{errors.loanType}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Monto Solicitado</label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className={`form-control ${errors.requestedAmount ? 'is-invalid' : ''}`}
            value={formData.requestedAmount}
            onChange={(e) => setFormData({...formData, requestedAmount: e.target.value})}
          />
          {errors.requestedAmount && <div className="invalid-feedback">{errors.requestedAmount}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Plazo (meses)</label>
        <input
          type="number"
          className={`form-control ${errors.term ? 'is-invalid' : ''}`}
          value={formData.term}
          onChange={(e) => setFormData({...formData, term: e.target.value})}
        />
        {errors.term && <div className="invalid-feedback">{errors.term}</div>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="card-body">
      <h4 className="mb-4">Información Laboral y Financiera</h4>
      
      <div className="mb-3">
        <label className="form-label">Tipo de Empleo</label>
        <select
          className={`form-select ${errors.employmentType ? 'is-invalid' : ''}`}
          value={formData.employmentType}
          onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
        >
          <option value="">Seleccione...</option>
          <option value="DEPENDENT">Dependiente</option>
          <option value="INDEPENDENT">Independiente</option>
          <option value="BUSINESS_OWNER">Dueño de Empresa</option>
        </select>
        {errors.employmentType && <div className="invalid-feedback">{errors.employmentType}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Años en Empleo Actual</label>
        <input
          type="number"
          className={`form-control ${errors.employmentYears ? 'is-invalid' : ''}`}
          value={formData.employmentYears}
          onChange={(e) => setFormData({...formData, employmentYears: e.target.value})}
        />
        {errors.employmentYears && <div className="invalid-feedback">{errors.employmentYears}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Ingreso Mensual</label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className={`form-control ${errors.monthlyIncome ? 'is-invalid' : ''}`}
            value={formData.monthlyIncome}
            onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
          />
          {errors.monthlyIncome && <div className="invalid-feedback">{errors.monthlyIncome}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Otros Ingresos (opcional)</label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control"
            value={formData.otherIncome}
            onChange={(e) => setFormData({...formData, otherIncome: e.target.value})}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="card-body">
      <h4 className="mb-4">Información de la Propiedad</h4>
      
      <div className="mb-3">
        <label className="form-label">Tipo de Propiedad</label>
        <select
          className={`form-select ${errors.propertyType ? 'is-invalid' : ''}`}
          value={formData.propertyType}
          onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
        >
          <option value="">Seleccione...</option>
          <option value="HOUSE">Casa</option>
          <option value="APARTMENT">Departamento</option>
          <option value="COMMERCIAL">Local Comercial</option>
          <option value="LAND">Terreno</option>
        </select>
        {errors.propertyType && <div className="invalid-feedback">{errors.propertyType}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Valor de la Propiedad</label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className={`form-control ${errors.propertyValue ? 'is-invalid' : ''}`}
            value={formData.propertyValue}
            onChange={(e) => setFormData({...formData, propertyValue: e.target.value})}
          />
          {errors.propertyValue && <div className="invalid-feedback">{errors.propertyValue}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección de la Propiedad</label>
        <textarea
          className={`form-control ${errors.propertyAddress ? 'is-invalid' : ''}`}
          value={formData.propertyAddress}
          onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
          rows="3"
        />
        {errors.propertyAddress && <div className="invalid-feedback">{errors.propertyAddress}</div>}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="card-body">
      <h4 className="mb-4">Documentación Requerida</h4>
      
      {loanTypes[formData.loanType].requiredDocuments.map(doc => (
        <div key={doc} className="mb-3">
          <label className="form-label">
            {doc.split(/(?=[A-Z])/).join(' ')}
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileUpload(doc, e.target.files[0])}
          />
        </div>
      ))}
      
      <div className="alert alert-info">
        <small>
          <i className="bi bi-info-circle me-2"></i>
          Todos los documentos deben estar en formato PDF o imagen (JPG, PNG)
        </small>
      </div>
    </div>
  );

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Solicitud de Préstamo Hipotecario</h3>
          </div>

          {/* Progreso */}
          <div className="p-3">
            <div className="progress" style={{height: '2px'}}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{width: `${(step / 4) * 100}%`}}
              />
            </div>
            <div className="d-flex justify-content-between mt-1">
              <span className={step >= 1 ? 'text-primary' : ''}>Préstamo</span>
              <span className={step >= 2 ? 'text-primary' : ''}>Laboral</span>
              <span className={step >= 3 ? 'text-primary' : ''}>Propiedad</span>
              <span className={step >= 4 ? 'text-primary' : ''}>Documentos</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}

            <div className="card-footer d-flex justify-content-between">
              {step > 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Anterior
                </button>
              )}
              
              {step < 4 ? (
                <button
                  type="button"
                  className="btn btn-primary ms-auto"
                  onClick={handleNext}
                >
                  Siguiente
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success ms-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Enviando...
                    </span>
                  ) : (
                    <span>
                      <i className="bi bi-check-circle me-2"></i>
                      Enviar Solicitud
                    </span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-info-circle me-2"></i>
              Información Importante
            </h5>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      Documentos Necesarios
                    </h6>
                    <ul className="list-unstyled mb-0">
                      <li><i className="bi bi-check-circle text-success me-2"></i>Comprobante de ingresos</li>
                      <li><i className="bi bi-check-circle text-success me-2"></i>Certificado de avalúo</li>
                      <li><i className="bi bi-check-circle text-success me-2"></i>Historial crediticio</li>
                      {formData.loanType === 'COMMERCIAL' && (
                        <li><i className="bi bi-check-circle text-success me-2"></i>Plan de negocios</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      Condiciones del Préstamo
                    </h6>
                    <ul className="list-unstyled mb-0">
                      <li>
                        <i className="bi bi-calculator me-2"></i>
                        Financiamiento máximo: {loanTypes[formData.loanType].maxFinancing}%
                      </li>
                      <li>
                        <i className="bi bi-clock me-2"></i>
                        Plazo máximo: {
                          formData.loanType === 'FIRST_HOME' ? '30 años' :
                          formData.loanType === 'SECOND_HOME' ? '20 años' :
                          formData.loanType === 'COMMERCIAL' ? '25 años' : '15 años'
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de confirmación */}
        <div className="modal fade" id="confirmationModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Envío</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <p>¿Está seguro de que desea enviar la solicitud de préstamo?</p>
                <p className="mb-0">
                  <small className="text-muted">
                    Una vez enviada, no podrá modificar la información proporcionada.
                  </small>
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoanApplication;