import { useState, useEffect } from "react";

type TimerTypes = {
  isTimedChallengeRunning: boolean;
  setIsTimedChallengeRunning: React.Dispatch<React.SetStateAction<boolean>>;
  onTimeUp: () => void;
};

function Timer({
  isTimedChallengeRunning,
  setIsTimedChallengeRunning,
  onTimeUp,
}: TimerTypes) {
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    if (!isTimedChallengeRunning || timer <= 0) {
      setIsTimedChallengeRunning(false);
      setTimer(30);
      if (timer === 0) onTimeUp();
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
