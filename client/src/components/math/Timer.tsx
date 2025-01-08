import { BackdropProps } from "@mui/material";
import { useState, useEffect } from "react";

type TimerTypes = {
  isTimedChallengeRunning: boolean;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  setIsTimedChallengeRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

function Timer({
  isTimedChallengeRunning,
  timer,
  setTimer,
  setIsTimedChallengeRunning,
}: TimerTypes) {
  useEffect(() => {
    if (!isTimedChallengeRunning || timer <= 0) {
      setIsTimedChallengeRunning(false);
      setTimer(60);
      return;
    }

    const timeRemaining = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timeRemaining);
  }, [isTimedChallengeRunning, timer]);

  return <>{timer}</>;
}

export default Timer;
