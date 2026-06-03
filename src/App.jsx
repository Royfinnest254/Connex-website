import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';


// Pages
import Home from './pages/Home';
import Product from './pages/Product';
import Banks from './pages/Solutions/Banks';
import Fintechs from './pages/Solutions/Fintechs';
import Regulators from './pages/Solutions/Regulators';
import About from './pages/Company/About';
import Team from './pages/Company/Team';
import Whitepaper from './pages/Resources/Whitepaper';
import FAQ from './pages/Resources/FAQ';
import Security from './pages/Security';
import Contact from './pages/Contact';
import Privacy from './pages/Legal/Privacy';
import Terms from './pages/Legal/Terms';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/solutions/banks" element={<Banks />} />
          <Route path="/solutions/fintechs" element={<Fintechs />} />
          <Route path="/solutions/regulators" element={<Regulators />} />
          <Route path="/company/about" element={<About />} />
          <Route path="/company/team" element={<Team />} />
          <Route path="/resources/whitepaper" element={<Whitepaper />} />
          <Route path="/resources/faq" element={<FAQ />} />
          <Route path="/security" element={<Security />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
