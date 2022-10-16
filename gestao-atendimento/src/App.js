import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/home/Home";
import Cliente from "./pages/cliente/Cliente";
import TipoServico from "./pages/tipoServico/TipoServico";
import TipoProduto from "./pages/tipoProduto/TipoProduto";
import Servico from "./pages/servico/Servico";
import Produto from "./pages/produto/Produto";
import Funcionario from "./pages/funcionario/Funcionario";
import Login from "./pages/login/Login";
function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/tipoServico" element={<TipoServico />} />
          <Route path="/tipoProduto" element={<TipoProduto />} />
          <Route path="/servico" element={<Servico />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/funcionario" element={<Funcionario />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
