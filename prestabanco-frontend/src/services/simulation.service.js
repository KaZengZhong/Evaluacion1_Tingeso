import api from './api';

const SimulationService = {
  // Calcular cuota mensual
  calculateMonthlyPayment: async (data) => {
    return await api.post('/simulations/monthly-payment', {
      amount: data.amount,
      term: data.term,
      interestRate: data.interestRate
    });
  },

  // Calcular costos totales
  calculateTotalCosts: async (data) => {
    return await api.post('/simulations/total-costs', {
      amount: data.amount,
      term: data.term,
      interestRate: data.interestRate,
      loanType: data.loanType
    });
  },

  // Guardar simulación
  saveSimulation: async (data) => {
    return await api.post('/simulations', data);
  }
};

export default SimulationService;