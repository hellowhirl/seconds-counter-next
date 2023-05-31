import styles from "../page.module.css";

interface TimerAreaProps {
  timeElapsed: number;
  isRunning: boolean;
  handleStartStop: () => void;
}

const TimerArea: React.FC<TimerAreaProps> = ({
  timeElapsed,
  isRunning,
  handleStartStop,
}) => {
  return (
    <div className={styles.timerArea}>
      <div className={styles.timerBox}>
        <div
          className={`${styles.timeElapsed} ${
            timeElapsed >= 1800 && isRunning ? `${styles.fadeOut}` : ""
          }`}
        >
          <div className={styles.seconds}>
            {Math.floor(timeElapsed / 1000) < 10 ? 0 : ""}
            {Math.floor(timeElapsed / 1000)}
          </div>
          .
          <div className={styles.milliseconds}>
            {Math.round(
              Math.abs(timeElapsed - Math.floor(timeElapsed / 1000) * 1000) *
                0.1
            ) < 10
              ? "0"
              : ""}
            {Math.round(
              Math.abs(timeElapsed - Math.floor(timeElapsed / 1000) * 1000) *
                0.1
            )}
          </div>
        </div>
      </div>
      <button className={styles.startStopButton} onClick={handleStartStop}>
        {isRunning ? "STOP" : "START"}
      </button>
    </div>
  );
};

export default TimerArea;
