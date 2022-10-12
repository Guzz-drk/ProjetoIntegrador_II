import { Link } from "react-router-dom";

import Container from "./Container";

import styles from "../css/Navbar.module.css";

import logo from "../img/barber-shop.png";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="CleanCut"></img>
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/cliente">Cliente</Link>
          </li>
          <li className={styles.item}>
            <Link to="/servico">Serviço</Link>
          </li>
          <li className={styles.item}>
            <Link to="/produto">Produto</Link>
          </li>
          <li className={styles.item}>
            <Link to="/funcionario">Funcionário</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
