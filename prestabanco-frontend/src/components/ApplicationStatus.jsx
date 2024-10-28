import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ApplicationStatus() {
  const location = useLocation();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    // Aquí se haría la llamada al API para obtener el estado actual de la solicitud
    // Por ahora usamos datos de ejemplo
    setApplication({
      id: '123456',
      status: 'E3',
      submissionDate: new Date().toLocaleDateString(),
      lastUpdate: new Date().toLocaleDateString(),
      type: 'FIRST_HOME',
      amount: 150000000,
      term: 240,
    });
  }, []);

  const getStatusInfo = (status) => {
    const statusInfo = {
      E1: {
        label: 'En Revisión Inicial',
        description: 'Su solicitud está siendo revisada inicialmente.',
        color: 'primary'
      },
      E2: {
        label: 'Pendiente de Documentación',
        description: 'Se requieren documentos adicionales.',
        color: 'warning'
      },
      E3: {
        label: 'En Evaluación',
        description: 'Su solicitud está siendo evaluada por nuestro equipo.',
        color: 'info'
      },
      E4: {
        label: 'Pre-Aprobada',
        description: 'Su solicitud ha sido pre-aprobada.',
        color: 'success'
      },
      E7: {
        label: 'Rechazada',
        description: 'Lo sentimos, su solicitud no cumple con los requisitos.',
        color: 'danger'
      }
    };
    return statusInfo[status] || {
      label: 'Estado Desconocido',
      description: 'No se puede determinar el estado actual.',
      color: 'secondary'
    };
  };

  if (!application) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(application.status);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        {location.state?.message && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {location.state.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          </div>
        )}

        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Estado de su Solicitud</h3>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-6">
                <h5>Número de Solicitud</h5>
                <p className="lead">{application.id}</p>
              </div>
              <div className="col-md-6 text-md-end">
                <h5>Estado Actual</h5>
                <span className={`badge bg-${statusInfo.color} fs-6`}>
                  {statusInfo.label}
                </span>
              </div>
            </div>

            <div className="alert alert-light">
              <p className="mb-0">{statusInfo.description}</p>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Fecha de Solicitud</h6>
                    <p className="card-text">{application.submissionDate}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Última Actualización</h6>
                    <p className="card-text">{application.lastUpdate}</p>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <h5 className="mb-3">Detalles del Préstamo</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Tipo</h6>
                    <p className="card-text">{application.type}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Monto</h6>
                    <p className="card-text">${application.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Plazo</h6>
                    <p className="card-text">{application.term} meses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationStatus;