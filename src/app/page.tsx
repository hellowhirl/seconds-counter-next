"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import create from "zustand";
import MessageArea from "./components/MessageArea";
import TimerArea from "./components/TimerArea";
import Options from "./components/Options";
import Records from "./components/Records";
import AdContainer from "./components/AdContainer";
import AboutPage from "./components/AboutPage";

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
