import styles from "../page.module.css";

const AboutPage: React.FC = () => {
  return (
    <div>
      <p>
        Welcome to the Timer Challenge! This game is designed to test your
        timing and precision skills.{" "}
      </p>
      <p>
        The objective is simple: start the timer and stop it exactly when it
        reaches the designated goal time. Choose from various challenge
        durations, ranging from 5 to 60 seconds.{" "}
      </p>
      <p>
        The game provides real-time feedback, showing you how close or far you
        are from the goal time. Challenge yourself, improve your timing
        accuracy, and compete for the best records.{" "}
      </p>
      <p>
        Are you up for the challenge? Start the timer and see how well you can
        master the art of perfect timing!
      </p>
    </div>
  );
};

export default AboutPage;
