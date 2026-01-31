import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Certificates from './pages/Certificates';
import Products from './pages/Products';
import Companies from './pages/Companies';
import ManageAdmins from './pages/ManageAdmins';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="lg:ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/products" element={<Products />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/manage-admins" element={<ManageAdmins />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;