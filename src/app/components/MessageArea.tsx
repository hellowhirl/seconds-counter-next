import styles from "../page.module.css";

interface MessageAreaProps {
  goalTime: number;
  timeDifference: number | null;
  isRunning: boolean;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  goalTime,
  timeDifference,
  isRunning,
}) => {
  return (
    <div className={styles.topArea}>
      <h1 className={styles.gameInstructions}>
        Press <b>STOP</b> when the timer reaches{" "}
        <b>{goalTime / 1000} seconds!</b>
      </h1>
      {!isRunning && (
        <div className={styles.messageArea}>
          {timeDifference !== null && (
            <p>
              <b>{`${(timeDifference / 1000).toFixed(2)}`}</b>{" "}
              <u>seconds close</u>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageArea;
