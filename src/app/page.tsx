import React, { useState } from "react";
import styles from "./page.module.css";
import AdContainer from "./components/AdContainer";
import Link from "next/link";
import Game from "./components/Game";

const MainPage: React.FC = () => {
  return (
    <div className={styles.gameContainer}>
      <Game />
    </div>
  );
};

export default MainPage;
