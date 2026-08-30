import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminAuth from './components/AdminAuth';
// import DevAdminLink from './components/DevAdminLink';
import SecretAdmin from './pages/SecretAdmin';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Laureates from './pages/Laureates';
import Partners from './pages/Partners';
import Team from './pages/Team';
import Contact from './pages/Contact';
import ApplicationForm from './pages/ApplicationForm';
import VotePage from './pages/Vote';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import Reglement from './pages/Reglement';
import FAQ from './pages/FAQ';
import Jury from './pages/Jury';
import Galerie from './pages/Galerie';
import Tickets from './pages/Tickets';
import Souvenirs from './pages/Souvenirs';
import PourquoiParticiper from './pages/PourquoiParticiper';
import Calendrier from './pages/Calendrier';
import LegalDocumentPage from './pages/LegalDocument';
import { getLegalDocument } from './data/legal';

const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/souvenirs" element={<Souvenirs />} />
          <Route path="/pourquoi-participer" element={<PourquoiParticiper />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/laureats" element={<Laureates />} />
          <Route path="/partenaires" element={<Partners />} />
          <Route path="/equipe" element={<Team />} />
          <Route path="/jury" element={<Jury />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/reglement" element={<Reglement />} />
          <Route path="/cgu" element={<LegalDocumentPage document={getLegalDocument('cgu')} />} />
          <Route path="/cgv" element={<LegalDocumentPage document={getLegalDocument('cgv')} />} />
          <Route path="/confidentialite" element={<LegalDocumentPage document={getLegalDocument('confidentialite')} />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/candidater" element={<ApplicationForm />} />
          <Route path="/voter" element={<VotePage />} />
          
          {/* Route secrète pour l'administration */}
          <Route path="/secret-admin-access-hag2025" element={<SecretAdmin />} />
          
          {/* Routes d'administration - Protégées par authentification */}
          <Route path="/admin" element={
            <AdminAuth>
              <AdminDashboard />
            </AdminAuth>
          } />
          <Route path="/admin/profile" element={
            <AdminAuth>
              <AdminProfile />
            </AdminAuth>
          } />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {/* <DevAdminLink /> */}
    </div>
  );
};

export default App; 