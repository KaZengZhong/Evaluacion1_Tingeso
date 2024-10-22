// src/services/loan.service.js
import http from "../http-common";

class LoanService {
  simulate(data) {
    return http.post("/loans/simulate", data);
  }

  apply(data) {
    return http.post("/applications", data);
  }

  getStatus(id) {
    return http.get(`/applications/${id}`);
  }
}

export default new LoanService();

// src/services/user.service.js
import http from "../http-common";

class UserService {
  register(data) {
    return http.post("/users", data);
  }

  login(data) {
    return http.post("/auth/login", data);
  }
}

export default new UserService();