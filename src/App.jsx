import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CreateForm from './components/CreateForm';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignupForm />} />
        <Route path="createform" element={<CreateForm />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="home" element={<LandingPage />} />
        <Route index element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
