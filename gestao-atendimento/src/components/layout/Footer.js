import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import styles from "../css/Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <FaFacebook></FaFacebook>
        </li>
        <li>
          <FaInstagram></FaInstagram>
        </li>
        <li>
          <FaLinkedin></FaLinkedin>
        </li>
        <li>
          <FaTwitter></FaTwitter>
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>CleanCut &copy; 2022</span>
      </p>
    </footer>
  );
}
export default Footer;
