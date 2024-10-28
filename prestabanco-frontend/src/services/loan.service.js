import api from './api';

const LoanService = {
  // Simulación de préstamo
  simulateLoan: async (data) => {
    return await api.post('/loans/simulate', {
      loanType: data.loanType,
      amount: data.amount,
      term: data.term
    });
  },

  // Tipos de préstamos
  getLoanTypes: async () => {
    return await api.get('/loans/types');
  },

  // Solicitar préstamo
  applyForLoan: async (data) => {
    return await api.post('/applications', data);
  },

  // Obtener tasas de interés
  getInterestRates: async () => {
    return await api.get('/loans/rates');
  }
};

export default LoanService;