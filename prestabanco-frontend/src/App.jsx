import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoanSimulator from './components/LoanSimulator';
import LoanApplication from './components/LoanApplication';
import Login from './components/Login';
import Register from './components/Register';
import ApplicationStatus from './components/ApplicationStatus';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loan-simulator" element={<LoanSimulator />} />
          <Route path="/loan-application" element={<LoanApplication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/application-status" element={<ApplicationStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
