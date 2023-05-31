"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import create from "zustand";
import MessageArea from "./components/MessageArea";

type GameState = {
  timeElapsed: number;
  isRunning: boolean;
  timerRef: NodeJS.Timeout | null;
  startTime: number | null;
  timeDifference: number | null;
  goalTime: number;
  setGoalTime: (time: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  records: {
    goalTime: number;
    resultTime: number;
    difference: number;
  }[];
  secondsOptions: number[];
};

const useGameStore = create<GameState>((set) => ({
  timeElapsed: 0,
  isRunning: false,
  timerRef: null,
  startTime: null,
  timeDifference: null,
  goalTime: 10000, // default goal time is 10 seconds
  records: [],
  secondsOptions: [5, 10, 20, 30, 45, 60],

  startTimer: () => {
    set((state) => ({
      ...state,
      isRunning: true,
      startTime: performance.now(),
      timerRef: setInterval(() => {
        set((state) => ({
          ...state,
          timeElapsed: performance.now() - state.startTime!,
        }));
      }, 10),
    }));
  },

  stopTimer: () => {
    set((state) => {
      if (state.timerRef) {
        clearInterval(state.timerRef);
      }

      const resultTime = state.timeElapsed;
      const difference = Math.abs(resultTime - state.goalTime);
      const newRecord = { goalTime: state.goalTime, resultTime, difference };
      const records = [...state.records, newRecord];

      return {
        ...state,
        isRunning: false,
        timerRef: null,
        startTime: null,
        timeDifference: difference,
        records,
      };
    });
  },

  setGoalTime: (goalTime: number) => {
    set((state) => ({
      ...state,
      goalTime,
    }));
  },
}));

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

interface RecordsProps {
  records: {
    goalTime: number;
    resultTime: number;
    difference: number;
  }[];
  setShowRecords: (arg1: boolean) => void;
  setShowTimer: (arg1: boolean) => void;
  setShowSettingsButtons: (arg1: boolean) => void;
  setShowMessageArea: (arg1: boolean) => void;
}

const Records: React.FC<RecordsProps> = ({
  records,
  setShowRecords,
  setShowTimer,
  setShowSettingsButtons,
  setShowMessageArea,
}) => {
  return (
    <>
      <div
        className={styles.arrowLeft}
        onClick={() => {
          setShowRecords(false);
          setShowTimer(true);
          setShowSettingsButtons(true);
          setShowMessageArea(true);
        }}
      ></div>
      <h2 className={styles.pageTitle}>RECORDS</h2>
      <div className={styles.tableOutter}>
        <table className={styles.recordsTable}>
          <thead>
            <tr>
              <th>GOAL</th>
              <th>RESULT</th>
              <th>GAP</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>
                  {record.goalTime / 1000}
                  <span className={styles.spacer}></span>s
                </td>
                <td>{(record.resultTime / 1000).toFixed(2)}</td>
                <td>
                  {((record.goalTime - record.resultTime) / 1000).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      {records.length === 0 && <div>No records yet</div>}
    </>
  );
};

const AdContainer: React.FC = () => {
  return (
    <div className={styles.adContainer}>
      <div className={styles.adArea}>Ad space</div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const {
    timeElapsed,
    isRunning,
    startTimer,
    stopTimer,
    timeDifference,
    goalTime,
    setGoalTime,
    records,
    secondsOptions,
  } = useGameStore();

  const [showOptions, setShowOptions] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [showMessageArea, setShowMessageArea] = useState(true);
  const [showSettingsButtons, setShowSettingsButtons] = useState(true);
  const [showFadeOut, setShowFadeOut] = useState(false);

  const handleStart = () => {
    setShowFadeOut(false);
    startTimer();
    setTimeout(() => {
      setShowFadeOut(true);
    }, 1800);
  };

  const handleStartStop = () => {
    if (!isRunning) {
      handleStart();
      setShowSettingsButtons(false);
    } else {
      stopTimer();
      setShowSettingsButtons(true);
    }
  };

  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.gameContainer}>
      {showMessageArea && (
        <MessageArea
          goalTime={goalTime}
          timeDifference={timeDifference}
          isRunning={isRunning}
        />
      )}
      {showTimer && (
        <TimerArea
          timeElapsed={timeElapsed}
          isRunning={isRunning}
          handleStartStop={handleStartStop}
        />
      )}
      {showOptions && (
        <Options
          secondsOptions={secondsOptions}
          selectedOption={selectedOption}
          setGoalTime={setGoalTime}
          handleOptionClick={handleOptionClick}
          setShowOptions={setShowOptions}
          setShowTimer={setShowTimer}
          setShowSettingsButtons={setShowSettingsButtons}
          setShowMessageArea={setShowMessageArea}
        />
      )}
      {showRecords && (
        <Records
          records={records}
          setShowRecords={setShowRecords}
          setShowTimer={setShowTimer}
          setShowSettingsButtons={setShowSettingsButtons}
          setShowMessageArea={setShowMessageArea}
        />
      )}
      <AdContainer />
      <div className={styles.options}>
        {showSettingsButtons && (
          <button
            className={styles.optionButton}
            onClick={() => {
              setShowOptions(true);
              setShowTimer(false);
              setShowSettingsButtons(false);
              setShowMessageArea(false);
            }}
          >
            Options
          </button>
        )}
      </div>
      <div className={styles.records}>
        {showSettingsButtons && (
          <button
            className={styles.optionButton}
            onClick={() => {
              setShowRecords(true);
              setShowTimer(false);
              setShowSettingsButtons(false);
              setShowMessageArea(false);
            }}
          >
            Records
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
