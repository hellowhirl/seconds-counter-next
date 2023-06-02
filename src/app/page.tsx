import React, { useState } from "react";
import styles from "./page.module.css";
import AdContainer from "./components/AdContainer";
import Link from "next/link";
import Game from "./components/Game";

const MainPage: React.FC = () => {
  return (
    <div className={styles.gameContainer}>
      <Game />
      <Link href="/about" className={styles.settingsButton}>
        About
      </Link>
    </div>
  );
};

export default MainPage;
