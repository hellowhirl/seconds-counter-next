import Link from "next/link";
import AdContainer from "../components/AdContainer";
import styles from "../page.module.css";

const AboutPage: React.FC = () => {
  return (
    <div className={`${styles.gameContainer}`}>
      <Link href="/" className={styles.arrowLeft}></Link>
      <div className={styles.aboutPage}>
        <h3>Welcome to the Timer Challenge!</h3>
        <br />
        <p>This game is designed to test your timing and precision skills. </p>
        <h3>Stop the Timer On Target!</h3>
        <p>
          The objective is simple: start the timer and stop it exactly when it
          reaches the designated goal time. Choose from various challenge
          durations, ranging from 5 to 60 seconds.{" "}
        </p>
        <h3>Compete for Record Accuracy!</h3>
        <p>
          The game provides real-time feedback, showing you how close or far you
          are from the goal time. Challenge yourself, improve your timing
          accuracy, and compete for the best records.{" "}
        </p>
        <br />
        <p>
          Are you up for the challenge? Start the timer and see how well you can
          master the art of perfect timing!
        </p>
      </div>
      <AdContainer />
    </div>
  );
};

export default AboutPage;
