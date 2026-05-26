import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LangProvider } from './contexts/LangContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import api from './api/axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminInquiries from './pages/admin/Inquiries';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import AdminSettings from './pages/admin/Settings';
import CranesAdmin from './pages/admin/CranesAdmin';
import OurCranes from './pages/OurCranes';
import Clients from './pages/Clients';
import ClientsAdmin from './pages/admin/ClientsAdmin';
import ContactAdmin from './pages/admin/ContactAdmin';

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/admin" replace />;
}

function PublicLayout({ children }) {
  useEffect(() => {
    if (sessionStorage.getItem('view_tracked')) return;
    api.post('/views/track')
      .then(() => sessionStorage.setItem('view_tracked', '1'))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LangProvider>
        <BrowserRouter>
          <Routes>
            {/* Public site */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/gallery"    element={<PublicLayout><Gallery /></PublicLayout>} />
            <Route path="/our-cranes" element={<PublicLayout><OurCranes /></PublicLayout>} />
            <Route path="/clients"    element={<PublicLayout><Clients /></PublicLayout>} />
            <Route path="/contact"    element={<PublicLayout><Contact /></PublicLayout>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/inquiries" element={<ProtectedRoute><AdminInquiries /></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute><GalleryAdmin /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><ServicesAdmin /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
            <Route path="/admin/cranes"   element={<ProtectedRoute><CranesAdmin /></ProtectedRoute>} />
            <Route path="/admin/clients"  element={<ProtectedRoute><ClientsAdmin /></ProtectedRoute>} />
            <Route path="/admin/contact"  element={<ProtectedRoute><ContactAdmin /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LangProvider>
    </AuthProvider>
  );
}
