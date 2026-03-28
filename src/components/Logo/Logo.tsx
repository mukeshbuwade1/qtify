import React from "react";
import LogoImage from "../../assets/logo.png";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.brand}>
      <img
        className={styles.logoImg}
        src={LogoImage}
        alt="Qtify logo"
        width={67}
        height={40}
      />
      <span className={styles.wordmark}>Qtify</span>
    </div>
  );
}
