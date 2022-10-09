import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/home/Home";
import Cliente from "./pages/cliente/Cliente";
function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cliente" element={<Cliente />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
