import styles from "../../components/css/Home.module.css";
import agend from "../../components/img/Barber-amico.svg";
function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao<span>CleanCut</span>
      </h1>
      <p>Gerencie sua Agenda</p>
      <img src={agend} alt="CleanCut" className={styles.home_container}></img>
    </section>
  );
}
export default Home;
