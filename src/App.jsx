// src/App.js (extended example)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import HeroSection from "./Components/HeroSection";
import PostGig from "./Components/PostGig.jsx";
import FindGig from "./Components/FindGig.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/post-gig" element={<PostGig />} />
        <Route path="/find-gig" element={<FindGig />} />
        {/* Other routes */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
