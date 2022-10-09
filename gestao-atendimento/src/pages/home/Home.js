import styles from "../../components/css/Home.module.css";
import agend from "../../components/img/web.svg";
function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-Vindo ao<span>CleanCut</span>
      </h1>
      <p>Gerencie sua Agenda</p>
      <img src={agend} alt="CleanCut"></img>
    </section>
  );
}
export default Home;
