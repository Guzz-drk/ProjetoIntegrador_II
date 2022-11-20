import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
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
import Atendimento from "./pages/atendimento/Atendimento";
import AtendimentoProduto from "./pages/atendimentoProduto/AtendimentoProduto";
import LoginForm from "./pages/login/LoginForm";
import LogoutController from "./pages/logout/LogoutController";

function App() {
  const [token, setToken] = useState([]);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  if (!token || token <= "") {
    return <LoginForm />;
  } else {
    return (
      <div>
        <Router>
          <Navbar />
          <Container customClass="min-height">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cliente" element={<Cliente />} />
              <Route path="/tipoServico" element={<TipoServico />} />
              <Route path="/tipoProduto" element={<TipoProduto />} />
              <Route path="/servico" element={<Servico />} />
              <Route path="/produto" element={<Produto />} />
              <Route path="/funcionario" element={<Funcionario />} />
              <Route path="/atendimento" element={<Atendimento />} />
              <Route
                path="/atendimentoProduto"
                element={<AtendimentoProduto />}
              />
              <Route path="/logout" element={<LogoutController />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
