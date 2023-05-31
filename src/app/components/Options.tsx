import styles from "../page.module.css";

interface OptionsProps {
  secondsOptions: number[];
  selectedOption: string;
  setGoalTime: (time: number) => void;
  handleOptionClick: (option: string) => void;
  setShowOptions: (arg0: boolean) => void;
  setShowTimer: (arg0: boolean) => void;
  setShowSettingsButtons: (arg0: boolean) => void;
  setShowMessageArea: (arg0: boolean) => void;
}

const Options: React.FC<OptionsProps> = ({
  secondsOptions,
  selectedOption,
  setGoalTime,
  handleOptionClick,
  setShowOptions,
  setShowTimer,
  setShowSettingsButtons,
  setShowMessageArea,
}) => {
  return (
    <>
      <div
        className={styles.arrowLeft}
        onClick={() => {
          setShowOptions(false);
          setShowTimer(true);
          setShowSettingsButtons(true);
          setShowMessageArea(true);
        }}
      ></div>
      <h2 className={styles.pageTitle}>OPTIONS</h2>
      <div className={styles.optionsScreen}>
        <h3 className={styles.optionTitle}>Select goal time</h3>
        <div className={styles.optionsTimes}>
          {secondsOptions.map((item, i) => (
            <div className={styles.optionsTimesContainer}>
              <button
                className={`${styles.option} ${
                  selectedOption === `option${i}` ? `${styles.selected}` : ""
                }`}
                onClick={() => {
                  handleOptionClick(`option${i}`);
                  setGoalTime(item * 1000);
                }}
              >
                {item}
                <span className={styles.spacer}></span>s
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Options;
