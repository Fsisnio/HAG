import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
// import Laureates from './pages/Laureates';
// import History from './pages/History';
// import Blog from './pages/Blog';
import Partners from './pages/Partners';
import Team from './pages/Team';
import Contact from './pages/Contact';
import ApplicationForm from './pages/ApplicationForm';
import VotePage from './pages/Vote';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          {/* <Route path="/laureats" element={<Laureates />} /> */}
          {/* <Route path="/historique" element={<History />} /> */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/partenaires" element={<Partners />} />
          <Route path="/equipe" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/candidater" element={<ApplicationForm />} />
          <Route path="/voter" element={<VotePage />} />
          
          {/* Routes d'administration */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App; 